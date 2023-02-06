import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import useAxios from "../../../action/hooks/useAxios";

import RoomHeader from "../../layout/room/RoomHeader";
import RoomMain from "../../layout/room/RoomMain";
import RoomHeaderLoading from "./RoomHeaderLoading";
import RoomMainLoading from "../room/RoomMainLoading";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import GoHome from "../../common/GoHome";

function RoomPage() {
  // roomId 값을 RoomListItem에서 Link state에 받아와서
  // useLocation에 넣어논 roomId 값을 가져와서 사용함
  const location = useLocation();
  const params = useParams();

  const roomParamsId = params.id;
  const password = location.state?.password;
  const { token, userinfo } = useSelector((state) => state);
  const editHost = location.state?.host

  const [join, setJoin] = useState(false);
  const [host, setHost] = useState(false);
  const [data, setData] = useState();
  const [valid, setValid] = useState({
    password: password,
  });
  const [aboutUser, setAboutUser] = useState({});
  const [postData, isLoading] = useCallback(
    useAxios(`interviewrooms/${roomParamsId}`, "POST", token, valid)
  );

  console.log(data)

  //useEffect
  useEffect(() => {
    setAboutUser(userinfo);
  }, [userinfo]);

  useEffect(() => {
    if (postData && postData.data && postData.data.manager.id === userinfo.id) {
      setHost(true);
    }
    if (editHost === true){
      setHost(true)
    }
  }, [postData]);

  useEffect(() => {
    const tmpData = postData?.data;

    if (postData && tmpData) {
      setData(tmpData); // 데이터 저장

      const MemberArr = tmpData.participants; // 참가자 명단
      let isIN = false; // 내가 참가했는지 판단하는 변수

      // Participants 안에 user 이름이 있으면 해당 정보(interviewjoinId 포함)를 aboutUser에 저장, 이후 자식 컴포넌트에 전달됨
      if (MemberArr?.length >= 2) {
        for (let i = 0; i < MemberArr.length; i++) {
          if (MemberArr[i].name === userinfo.name) {
            isIN = true;

            setAboutUser({ ...MemberArr[i] });
          } else continue;
        }
      }

      //있으면 join 값 바꿔줌
      setJoin(isIN ? true : false);
    }
  }, [postData]);

  // true: 대가자
  // false: 참여자

  const joinRoom = (join) => {
    setJoin(join);
  };

  return (
    <Container>
      <Room>
        <GoHome />
        {data && data.id && !isLoading ? (
          <>
            <RoomHeader
              joinRoom={joinRoom}
              data={data}
              join={join}
              host={host}
              token={token}
              password={password}
              userinfo={aboutUser}
            />
            <RoomMain
              data={data}
              join={join}
              host={host}
              userinfo={aboutUser}
            />
          </>
        ) : (
          <>
            <RoomHeaderLoading />
          </>
        )}
      </Room>
    </Container>
  );
}
export default RoomPage;

const Room = styled.div`
  width: 85vw;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 2rem;
  align-items: flex-start;
  z-index: 3;
`;

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-block: 10vh;
  background-color: var(--white);
`;
