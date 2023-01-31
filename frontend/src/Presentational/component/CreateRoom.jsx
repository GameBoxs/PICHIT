import styled from "styled-components";
import React, { useState, useCallback,useEffect } from "react";
import { ToggleButton } from "../common/ToggleButton";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Title from "../common/Title";

import useAxios from "../../action/hooks/useAxios";
import { useSelector } from "react-redux";
import axios from "axios";




// 방 생성하기 모달
function CreateRoom({ setModalOpen }) {
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
  //   "/interviewrooms",
  //   "POST",
  //   room
  // );


  const test = {
    title: "테스트 방",
    description: "테스트 설명",
    maxPersonCount: 0,
    password: "1234",
    finished: 0,
    startDate: "2023-01-31T12:08:36.833Z",
    managerId: 2,
  }

  const InputHandler = useCallback((e, type) => {
    const value = (prev) => {
      return { ...prev };
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
  }, []);

  const token =useSelector(state => state.token)
  
  // const data = useAxios('interviewrooms', "POST" , token, test)


  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }

  const closeModal = () => {
    setModalOpen(false);
  };
  
  useEffect (() => {
    document.body.style = `overflow:hidden`;
    return () => document.body.style = `overflow:auto`
  },[])

  const [isLoading, setIsLoading] = useState(true);

  const createRoom = () => {
    console.log(test)
    axios({
      method: 'POST',
      url:'https://i8d107.p.ssafy.io/api/interviewrooms',
      headers:{
        Authorization: token
      },
      data:test,
    })
    .then((res) => {
      console.log(res)
      setRoom(res.test);
      console.log(res.test)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <Wrap onClick={closeModal}>
      <ModalContainer onClick = {(e) => e.stopPropagation()}>
        <Header>
          <Title title='방 생성하기' />
        </Header>
        <Layout height="40%">
          <Section width="50%">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              footer={footer}
            />
          </Section>
          <Section width="60%">
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
                {toggle ? (
                  <InfoInput
                    onChange={() => {
                      InputHandler("password");
                    }}
                  />
                ) : null}
              </Info>
            </InfoList>
          </Section>
        </Layout>
        <Layout height="30%">
          <Section width="100%">
            <RoomText
              placeholder="방 생성에 필요한 정보를 입력하세요"
              onChange={() => {
                InputHandler("desciption");
              }}
            ></RoomText>
          </Section>
        </Layout>
        <Layout height="20%">
          <button onClick={createRoom}>생성하기</button>
          <button onClick={closeModal}>취소하기</button>
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
  padding:30px
`;

const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
  height: ${(props) => props.width};
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
  border: none
`;

const Header = styled.div`
margin: 10px;
  text-align: center;
`