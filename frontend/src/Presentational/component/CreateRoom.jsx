import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { ToggleButton } from "../common/ToggleButton";
import Title from "../common/Title";
import Button from "../common/Button";

import useAxios from "../../action/hooks/useAxios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// 방 생성하기 모달
function CreateRoom({ setModalOpen }) {
  const navigate = useNavigate();
  // 비밀방 여부 toggle : false(off) true(on)
  const [toggle, setToggle] = useState(false);

  const Togglehandler = (toggle) => {
    setToggle(toggle);
  };

  // 방 생성 정보 들어감
  const [room, setRoom] = useState({
    title: "",
    description: "",
    contactWay: "",
    maxPersonCount: 2,
    password: "",
    finished: 0,
    startDate: "",
    managerId: 0,
  });

  // Daypicker 용
  const [selected, setSelected] = useState();

  // 날짜 선택해서 데이터 넣음
  const handleDayClick = (day) => {
    setSelected(day);
    setRoom((prev) => {
      return { ...prev, startDate: day };
    });
  };

  // 방 생성하기 모달에 적은 input 값 넣어줌
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

  const token = useSelector((state) => state.token);

  // 방 생성하기 useAxios
  const [createData, setCreateData] = useState(false);
  const [createResult, isLoading] = useAxios(
    "interviewrooms",
    "POST",
    token,
    room,
    createData
  );

  // Daypicker 날짜 선택 handler
  const handleDaySelect = (date) => {
    setSelected(date);
    if (date) {
      setRoom(format(date, "yyyy-MM-dd"));
    }
    setRoom("");
  };

  // 방 생성하기
  const roomCreate = (e) => {
    if (room.title.trim() === "") {
      alert("제목을 입력해주세요");
    } else if (room.description === "") {
      alert("설명을 입력해주세요");
    } else if (room.maxPersonCount === "") {
      alert("모집인원을 입력해주세요");
    } else if (room.maxPersonCount > 4) {
      alert("최대 모집인원을 초과하였습니다");
    } else if (room.maxPersonCount <= 1) {
      alert("최소 2명 이상의 모집인원을 입력 해 주세요");
    } else if (room.startDate === "") {
      alert("시작 날짜를 설정해주세요");
    } else if (toggle === true && room.password.trim() === "") {
      alert("비밀번호를 설정해주세요");
    } else if (toggle === true && room.password.length > 10) {
      alert("유효 할 수 없는 비밀번호 입니다. 다시 설정해주세요");
    } else {
      setCreateData(true);
    }
  };

  // 면접방 생성에 성공했을 때 감지하는 useEffect
  useEffect(() => {
    if (
      createResult &&
      createResult.success === true &&
      createResult.success !== undefined
    ) {
      setModalOpen(false);
      MySwal.fire({
        html: (
          <div>
            면접방이 생성 되었습니다
            <br />
            면접방으로 이동하시겠습니까?
          </div>
        ),
        icon: "success",
        showConfirmButton: true,
        confirmButtonText: "이동하기",
        showCancelButton: true,
        cancelButtonText: "취소하기",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/room/${createResult.data.id}`, {
            state: {
              id: createResult.data.id,
              password: room.password,
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          window.location.reload();
        }
      });
    }
  }, [createResult]);

  // 생성하기 버튼 눌렀을 때 활성화 되는 함수
  return (
    <Wrap onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title title="방 생성하기" />
        </Header>
        <Layout height="40%">
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
                  name="contactWay"
                  value={room.contactWay}
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
                    className="subInput"
                  />
                </div>
                {toggle ? (
                  <InputNum>
                    <InfoText>비밀번호</InfoText>
                    <InfoInput
                      name="password"
                      maxLength="11"
                      Value={room.password|| ''}
                      onChange={InputHandler}
                      pattern="^[a-zA-Z0-9]+$"
                      className="subInput"
                    />
                  </InputNum>
                ) : null}
              </Info>
            </InfoList>
          </Section>
        </Layout>
        <Layout height="30%">
          <Section width="100%">
            <RoomText
              placeholder="방 생성에 필요한 정보를 입력하세요"
              name="description"
              value={room.description}
              onChange={InputHandler}
            ></RoomText>
          </Section>
        </Layout>
        <Layout height="20%">
          <Button handler={roomCreate} text={"생성하기"} isImportant={true} />
          <Button handler={closeModal} text={"취소하기"} isImportant={false} />
        </Layout>
      </ModalContainer>
    </Wrap>
  );
}
export default CreateRoom;

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

  .rdp-day_selected,
  .rdp-day_selected:focus-visible,
  .rdp-day_selected:hover {
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
    justify-content: left;

    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;
      padding-top: 10px;

      * {
        padding-block: 0;
      }
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

  .Title {
    font-size: 2rem;
    color: var(--primary);
  }
`;

const InputNum = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100%;

  input {
    width: 100%;
  }

  ${InfoText} {
    width: 180px;
  }
`;
