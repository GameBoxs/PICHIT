import styled from "styled-components";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { ToggleButton } from "../common/ToggleButton";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Title from "../common/Title";

import useAxios from "../../action/hooks/useAxios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { testToken } from "../../store/values";
import { useParams } from "react-router-dom";
import Button from "../common/Button";

function EditRoom({ setModalOpen, data }) {
  const navigate = useNavigate();
  const params = useParams();

  const roomParamsId = params.id;

  const [toggle, setToggle] = useState(false);
  const Togglehandler = (toggle) => {
    setToggle(toggle);
    console.log(toggle);
  };

  // 방 수정 정보 들어감 -> 이전 정보 값 들고 옴
  const [room, setRoom] = useState({
    title: data.title,
    description: data.description,
    maxPersonCount: data.maxPersonCount,
    contactWay: data.contactWay,
    password: data.password,
    finished: 0,
    startDate: data.startDate,
    managerId: 0,
  });

  // 방 수정하기 모달에 적은 input 값 넣어줌

  const InputHandler = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    });
  };

  // 모달 닫는창
  const closeModal = () => {
    setModalOpen(false);
  };

  // 모달 밖 클릭시 모달 없앰
  useEffect(() => {
    document.body.style = `overflow:hidden`;
    return () => (document.body.style = `overflow:auto`);
  }, []);

  // Daypicker 용
  const [selected, setSelected] = useState();

  // 날짜 선택해서 데이터 넣음
  const handleDayClick = (day) => {
    setSelected(day);
  };

  const [editData, setEditData] = useState(false);
  const token = useSelector((state) => state.token);
  const roomId = data.id;
  // console.log(roomId);

  const handleDaySelect = (date) => {
    setSelected(date);
    if (date) {
      setRoom(format(date, "yyyy-MM-dd"));
    }
    setRoom("");
    console.log(date);
  };

  //Axios put 통신
  const [putData, isLoading] = useAxios(
    `interviewrooms/${roomParamsId}`,
    "PUT",
    token,
    room,
    editData
  );

  const RoomEdit = (e) => {
    console.log(room);
    setEditData(true);
  };

  // 방 수정했을 때 방장 확인을 못하는 오류로 state로 host 값을 직접 전달해줌
  useEffect(() => {
    if (putData && putData.success === true && putData.success !== undefined) {
      setModalOpen(false);
      if (room.password === null){
        navigate(`/room/${roomParamsId}`, {
          state: {
            host: true,
          },
        });
      }
      else{
 
        navigate(`/room/${roomParamsId}`, {
          state: {
            host: true,
            password:room.password
          },
        });
      }
      window.location.reload();

    }
  }, [putData]);

  return (
    <Wrap onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>방 수정하기</Header>
        <Layout>
          <Section width="50%">
            <DayPicker
              mode="single"
              selected={selected}
              onDayClick={handleDayClick}
              name="startDate"
              value={room.startDate}
              onChange={handleDaySelect}
            />
          </Section>
          <Section width="60%">
            <InfoList>
              <Info>
                <InfoText>방 이름</InfoText>
                <InfoInput
                  name="title"
                  value={room.title}
                  onChange={InputHandler}
                />
              </Info>
              <Info>
                <InfoText>모집 인원</InfoText>
                <InfoPerson
                  max="4"
                  min="2"
                  step="1"
                  name="maxPersonCount"
                  value={room.maxPersonCount}
                  onChange={InputHandler}
                />
              </Info>
              <Info>
                <InfoText>연락 방법</InfoText>
                <InfoInput
                  name="contectWay"
                  Value={room.contactWay}
                  onChange={InputHandler}
                />
              </Info>
              <Info>
                <div>
                  <InfoText>비밀방 여부</InfoText>
                  <ToggleButton
                    toggle={toggle}
                    ToggleHandler={Togglehandler}
                    onClick={Togglehandler}
                  />
                </div>
                {toggle ? (
                  <InputNum>
                  <InfoText>비밀번호</InfoText>
                  <InfoInput
                    name="password"
                    defaultValue={room.password}
                    onChange={InputHandler}
                  />
                  </InputNum>
                ) : null}
              </Info>
            </InfoList>
          </Section>
        </Layout>
        <Layout height="0">
          <Section width="100%">
            <RoomText
              placeholder="방 생성에 필요한 정보를 입력하세요"
              name="description"
              onChange={InputHandler}
            ></RoomText>
          </Section>
        </Layout>
        <Layout>
          <Button handler={RoomEdit} text={"수정하기"} isImportant={true} />
          <Button handler={closeModal} text={"취소하기"} isImportant={false} />
        </Layout>
      </ModalContainer>
    </Wrap>
  );
}
export default EditRoom;

const InputNum = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  input {
    width: 50%;
  }
`

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9998;
`;

const ModalContainer = styled.div`
  width: 700px;
  height: 700px;

  /* 최상단 위치 */
  z-index: 9999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  box-shadow: 5px 10px 10px 1px rgba(0, 0, 0, 0.3);
  padding: 30px;
`;

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  height: auto;
  width: 100%;
  margin-bottom: 1em;
  margin-top: 1em;

  &:first-child {
    height: 50vh;
  }

  &:last-child {
    div {
      height: 5vh;
    }
  }

  .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover {
    background-color: var(--primary) !important;
  }
`;

const Section = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: inherit;
`;

const InfoText = styled.div``;

const Info = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
  padding-inline: 10px;
  align-items: center;

  &:last-child {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: right;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding:10px;
    }
  }
`;

const InfoInput = styled.input.attrs({ type: "text" })`
  background-color: var(--greyLight-1);
  padding: 1rem;
  border-radius: 5px;
  height: 30px;
  margin: 10px;
  border: none;
  width: 180px;
`;

const InfoPerson = styled.input.attrs({ type: "number" })`
  background-color: var(--greyLight-1);
  border-radius: 5px;
  padding: 1rem;
  height: 30px;
  width: 180px;
  margin: 10px;
  border: none;
`;

const RoomText = styled.textarea`
  width: 90% !important;
  height: 170px !important;
  margin: 0 5%;
  border: none;
  resize: none;
`;

const Header = styled.div`
  margin: 10px;
  text-align: center;
  font-size: 2rem;
  color: var(--primary);
`;
