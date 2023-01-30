import styled from "styled-components";
import React, { useState } from "react";
import { ToggleButton } from "../common/ToggleButton";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import useAxios from "../../action/hooks/useAxios";

// 방 생성하기 모달
function CreateRoom() {
  // 캘린더
  const [value, onChange] = useState(new Date());
  // 비밀방 여부 toggle : false(off) true(on)
  const [toggle, setToggle] = useState(false);

  const Togglehandler = (toggle) => {
    setToggle(toggle);
    console.log(toggle);
  };

  const [room, setRoom] = useState({
    title: "",
    description: "",
    maxPersonCount: 0,
    password: "",
    finished: 0,
    startDate: "",
    managerId: 0,
  });

  const [selected, setSelected] = useState();

  // const data = useAxios(
  //   "http://i8d107.p.ssafy.io/api/interviewrooms",
  //   "POST",
  //   room
  // );

  const InputHandler = (e, type) => {
    const value = (prev) => {
      return { ...prev, maxPersonCount: value };
    };

    switch (type) {
      case "title":
        setRoom((prev) => {
          return { ...prev, title: value };
        });
        break;
      case "desciption":
        setRoom((prev) => {
          return { ...prev, description: value };
        });
        break;
      case "maxPersoncount":
        setRoom((prev) => {
          return { ...prev, maxPersonCount: value };
        });
        break;
      case "password":
        setRoom((prev) => {
          return { ...prev, password: value };
        });
        break;
      case "finished":
        setRoom((prev) => {
          return { ...prev, finished: value };
        });
        break;
      // case "startDate":
      //   setRoom((prev) => {
      //     return { ...prev, startDate: value };
      //   });
      //   break;

      default:
        break;
    }
  };


  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }
 

  return (
    <ModalContainer>
      <Layout>
        <Section width="50%">
          <DayPicker 
         mode="single"
          selected={selected}
          onSelect={setSelected}
          footer={footer}
          />
        </Section>
        <Section width="50%">
          <InfoList>
            <Info>
              <InfoText>방 이름</InfoText>
              <InfoInput
                onChange={() => {
                  InputHandler("title");
                }}
              />
            </Info>
            <Info>
              <InfoText>모집 인원</InfoText>
              <InfoInput
                onChange={() => {
                  InputHandler("maxPersoncount");
                }}
              />
            </Info>
            <Info>
              <InfoText>연락 방법</InfoText>
              <InfoInput />
            </Info>
            <Info>
              <InfoText>비밀방 여부</InfoText>
              <ToggleButton
                toggle={toggle}
                ToggleHandler={Togglehandler}
                onClick={Togglehandler}
              />
              {toggle ?  (
                <InfoInput
                  onChange={() => {
                    InputHandler("password");
                  }}
                />
              ):null}
            </Info>
          </InfoList>
        </Section>
      </Layout>
      <Layout>
        <Section width="100%">
          <RoomText
            placeholder="방 생성에 필요한 정보를 입력하세요"
            onChange={() => {
              InputHandler("desciption");
            }}
          ></RoomText>
        </Section>
      </Layout>
    </ModalContainer>
  );
}
export default CreateRoom;

const ModalContainer = styled.div`
  margin: 1em;
`;

const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
  height: 50%;
  width: 100%;
  margin-bottom: 1em;
  margin-top: 1em;
`;

const Section = styled.div`
  width: ${(props) => props.width};
  height: 100%;
`;

const InfoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;
const Info = styled.div`
  display: inline-flex;
  padding: 10px;
  align-items: center;
`;

const InfoText = styled.div``;
const InfoInput = styled.input.attrs({ type: "text" })`
  background-color: gray;
  border-radius: 5px;
  height: 30px;
  margin: 10px;
  border: none;
`;

const RoomText = styled.textarea`
  width: 100%;
  height: 200px;
`;
