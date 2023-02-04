import React, { useEffect, useState, useLayoutEffect } from "react";

import styled from "styled-components";
import Title from "../../common/Title";
import Button from "../../common/Button";
import EditRoom from "../../component/EditRoom";

import { useSelector } from "react-redux";
import { testToken } from "../../../store/values";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../action/hooks/useAxios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AggroL from "../../common/Font/AggroL";

const MySwal = withReactContent(Swal);

function RoomHeader({ join, joinRoom, data, host, password, token, userinfo }) {
  const { id, title, participants, sessionOpened } = data;

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [userJoin, setUserJoin] = useState({
    enter: false,
    quit: false,
  });
  const [deleteData, setDeleteData] = useState(false);
  const [joinId, setJoinId] = useState(0);
  const [isSessionOpen, setIsSessionOpen] = useState(false);

  console.log(sessionOpened)


  // axios 통신 시 보낼 정보들
  const enterObj = {
    interviewRoomId: id,
    password: password,
  };

  const quitObj = { id: joinId };
  const sessionObj = { interviewRoomId: id }


  //useAxios
  const [enterRes] = useAxios(
    //방 참가하기
    `interviewjoins`,
    "POST",
    token,
    enterObj,
    userJoin.enter
  );

  const deleteResult = useAxios(
    //방 삭제하기
    `interviewrooms/${id}`,
    "DELETE",
    token,
    null,
    deleteData
  );

  const [quitRes] = useAxios(
    //방 나가기
    `interviewjoins/${id}`,
    "DELETE",
    token,
    quitObj,
    userJoin.quit
  );

  const [createSession] = useAxios(
    //세션 생성
    `conference/sessions/${id}`,
    'POST',
    token,
    sessionObj,
    isSessionOpen
  )



  //useEffect
  useEffect(() => {
    setJoinId(userinfo.interviewJoinId);
  }, [userinfo]);

  useLayoutEffect(() => {
    //방 참여하기 성공 후 새로고침
    if (enterRes !== null) {
      if (enterRes.success) {
        window.location.reload();
      } else {
        alert("이미 참가한 방입니다");
      }
    }
  }, [enterRes]);

  useEffect(() => {
    //방 삭제하기
    if (
      deleteResult[0] &&
      deleteResult[0].success &&
      deleteResult[0].success !== undefined
    ) {
      Swal.fire({
        text: "면접방이 삭제 되었습니다.",
        showConfirmButton: false,
        icon: "success",
        timer: 1500,
      });
      navigate("/");
    }
  }, [deleteResult]);

  useLayoutEffect(() => {
    //방 탈퇴하기 성공 후 새로고침
    if (quitRes !== null && quitRes.success) {
      window.location.reload();
    }
  }, [quitRes]);

  useEffect(()=>{
    if(createSession!==null && createSession.success) {
      window.location.reload();
    } 
  }, [createSession])



  //Event Function
  const joinHandler = (isJoin) => {
    //방 참여하기
    joinRoom(isJoin);
    setUserJoin({
      enter: true,
      quit: false,
    });
  };

  const quitHandler = (isJoin) => {
    //방 탈퇴하기
    joinRoom(isJoin);
    setUserJoin({
      enter: false,
      quit: true,
    });
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const deleteRoom = () => {
    MySwal.fire({
      text: "면접방을 정말 삭제하시겠습니까?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleteData(true);
      }
    });
  };

  const moveToRoom = () => {
    // setGoSession(true)
    navigate("/interview", {
      state: {
        userinfo: {
          id: userinfo.id,
          name: userinfo.name,
          interviewJoinId: userinfo.interviewJoinId,
        },
        roomId: id,
      },
    });
  };

  const createRoom = () => {
    setIsSessionOpen(true)
  }


  //JSX 변수
  const ReadyBtn = (
    <Button text={"방 만들기"} handler={ createRoom} isImportant={true} />
  );

  const StartBtn = (
    <Button text={"방 입장하기"} handler={moveToRoom} isImportant={true} />
  );



  //화면 렌더링 함수
  const readyRoom = join ? (
    <Button
      text={"나가기"}
      handler={() => {
        quitHandler(false);
      }}
    >
      나가기
    </Button>
  ) : (
    <Button
      isImportant={false}
      text={"참여하기"}
      handler={() => joinHandler(true)}
    >
      참여하기
    </Button>
  );

  const RoomHost = host ? (
    <BtnContainer>
      {/* <LayoutButton text={"수정하기"} onClick={showModal}>수정하기</LayoutButton>
      <button onClick={showModal} >수정하기</button>
      {modalOpen && <EditRoom data={data} setModalOpen={setModalOpen} />} */}
      {/* <LayoutButton text={"삭제하기"} onClick={deleteRoom}> */}
      {participants.length >= 2 ? (sessionOpened ? StartBtn : ReadyBtn) : null}
      <Button text={"삭제하기"} handler={deleteRoom} isImportant={false}>
        삭제하기
      </Button>
      {/* </LayoutButton> */}
    </BtnContainer>
  ) : (
    <div>{readyRoom}</div>
  );

  return (
    <Layout>
      <AggroL />
      <Title title={title} />
      {RoomHost}
    </Layout>
  );
}

export default RoomHeader;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LayoutButton = styled.div`
  width: 10vw;
  height: 8vh;
`;

const Layout = styled.div`
  margin-bottom: 3rem;

  & .Title {
    font-size: 2.5rem;
    text-align: left;
    margin-block: 3rem;
    font-family: "SBagrroL";
  }

  .Btn {
    width: 10rem;
    height: 3.5rem;

    & * {
      font-size: 1rem;
    }
  }
`;
