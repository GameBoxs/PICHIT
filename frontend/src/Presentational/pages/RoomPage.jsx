import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useAxios from "../../action/hooks/useAxios";

import RoomHeader from "../layout/room/RoomHeader";
import RoomMain from "../layout/room/RoomMain";
import RoomHeaderLoading from "../layout/room/RoomHeaderLoading";
import Loading from "../common/Loading"

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import GoHome from "../common/GoHome";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function RoomPage() {
  // roomId 값을 RoomListItem에서 Link state에 받아와서
  // useLocation에 넣어논 roomId 값을 가져와서 사용함
  const location = useLocation();
  let navigate = useNavigate();
  
  const params = useParams();
  const { token, userinfo } = useSelector((state) => state);

  const roomParamsId = params.id;
  const password = location.state?.password;
  const editHost = location.state?.host;

  const [join, setJoin] = useState(false);
  const [host, setHost] = useState(false);

  const [data, setData] = useState();
  
  //비밀번호 저장
  const [valid, setValid] = useState({
    password: password,
  });
  const [aboutUser, setAboutUser] = useState({});
  const [postData, isLoading, contextError] = useAxios(
    `interviewrooms/${roomParamsId}`,
    "POST",
    token,
    valid,
    userinfo.id !== 0 ? true: false
  );
  
  useEffect(()=>{
    if(contextError&&contextError.message==="Request failed with status code 403"){
      MySwal.fire({
        text:"면접이 완료된 방은 접근할 수 없습니다",
        icon:"warning",
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/')
    }
  },[contextError])
  
  useEffect(() => {
    const tmpData = postData?.data;

    //데이터 받은 이후 participants에서 현재 사용자 정보 가져오기
    if (postData && tmpData) {
      let originParticipants = tmpData.participants;
      let userIsMe = {};

      for (let i in originParticipants) {
        if (i === 0) {
          if (originParticipants[i].id === userinfo.id) {
            break;
          }
        } else {
          if (originParticipants[i].id === userinfo.id) {
            userIsMe = originParticipants[i];
            originParticipants[i] = originParticipants[0];
            originParticipants[0] = userIsMe;
          }
        }
      }

      tmpData.participants = originParticipants;

      //방장인지 아닌지 판단
      if (
        (postData &&
          postData.data &&
          postData.data.manager.id === userinfo.id) ||
        editHost
      ) {
        setHost(true);
      }

      //interviewJoinId 받아서 정보 넣기
      const MemberArr = tmpData.participants; // 참가자 명단

      // Participants 안에 user 이름이 있으면 해당 정보(interviewjoinId 포함)를 aboutUser에 저장, 이후 자식 컴포넌트에 전달됨
      if (MemberArr?.length >= 2) {
        for (let i = 0; i < MemberArr.length; i++) {
          if (MemberArr[i].name === userinfo.name) {
            setJoin(true);

            setAboutUser({ ...MemberArr[i] });
          } else continue;
        }
      } else {
        //방장 혼자만 있을 때
        setAboutUser({ ...MemberArr[0] });
      }

      setData(tmpData); // 데이터 저장
    }

  }, [postData]);

  return (
    <Container>
      {aboutUser === {} ? (
        <Loading />
      ) : (
        <Room>
          <GoHome />
          {data && data.id && !isLoading ? (
            <>
              <RoomHeader
                setJoin={setJoin}
                data={data}
                userJoinInfo={{ join: join, host: host }}
                token={token}
                password={password}
                userinfo={aboutUser}
              />
              <RoomMain
                data={data}
                userJoinInfo={{ join: join, host: host }}
                userinfo={aboutUser}
              />
            </>
          ) : (
            <>
              <RoomHeaderLoading />
            </>
          )}
        </Room>
      )}
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
  position: relative;
`;
