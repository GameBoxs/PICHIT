import styled from "styled-components";
import RoomHeader from "../../layout/room/RoomHeader";
import RoomMain from "../../layout/room/RoomMain";
import React, { useState, useEffect,useCallback } from "react";
import { useSelector } from "react-redux";
import useAxios from "../../../action/hooks/useAxios";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

function RoomPage() {
  // roomId 값을 RoomListItem에서 Link state에 받아와서
  // useLocation에 넣어논 roomId 값을 가져와서 사용함
  const location = useLocation();
  const params = useParams();
  
  const roomParamsId = params.id;
  const password = location.state?.password;
  const { token, userinfo } = useSelector((state) => state);

  const [join, setJoin] = useState(false);
  const [host, setHost] = useState(false);
  const [data, setData] = useState();
  const [valid, setValid] = useState({
    password: password,
  });
  const [aboutUser, setAboutUser] = useState({}) 

  // 방장 권한을 어떤 방식으로 주는지 감이 안와서
  //일단 임시로 설정해 놓았습니다.
  // true : 방장 -> 방없애기 방 수정하기 버튼 활성화
  // false: 대기자 -> 참여하기 버튼 활성화

  // 방장 판별 슈도코드
  // const isHost = () =>{
  //   if 아이디 값 == 방 생성 아이디
  //     host 값 true
  //   else 아이디 값 !== 방생성 아이디
  //    host 값 false
  // }

  const [postData, isLoading] = useCallback(useAxios(
    `interviewrooms/${roomParamsId}`,
    "POST",
    token,
    valid
  ));
  console.log(postData)

  useEffect(()=>{
    setAboutUser(userinfo)
  }, [userinfo])

  useEffect(() => {
    if (postData && postData.data && postData.data.manager.id === userinfo.id) {
      setHost(true);
    }
  }, [postData]);

  useEffect(() => {
    const tmpData = postData?.data;

    if (postData && tmpData) {
      setData(tmpData);

      const MemberArr = tmpData.participants
      let isIN = false

      if (MemberArr?.length >= 2) {
        for (let i = 0; i < MemberArr.length; i++) {
          if (MemberArr[i].name === userinfo.name) {
            isIN = true;

            setAboutUser({...MemberArr[i]})
          } else continue
        }
      }
      // const Member = tmpData.participants?.map((elem) => elem.name);

      if (isIN) {
        setJoin(true);
      } else {
        setJoin(false);
      }
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
        {isLoading === true ? (
          <div>loading...</div>
        ) : data && data.id ? (
          <>
            <RoomHeader
              joinRoom={joinRoom}
              data={data}
              join={join}
              host={host}
              token={token}
              password={password}
              userinfo={userinfo}
            />
            <RoomMain data={data} join={join} host={host} userinfo={aboutUser} />
          </>
        ) : (
          <div>없는디여</div>
        )}
      </Room>
    </Container>
  );
}
export default RoomPage;

const Room = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  width: 80vw;
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: flex-start;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 10vh;
  background-color: var(--white);
`;
