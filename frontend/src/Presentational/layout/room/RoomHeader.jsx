import React, { useEffect, useState, useLayoutEffect, memo } from "react";

import styled from "styled-components";
import Title from "../../common/Title";
import Button from "../../common/Button";
import EditRoom from "../../component/EditRoom";

import { useNavigate } from "react-router-dom";
import useAxios from "../../../action/hooks/useAxios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createSession } from "../../../action/modules/chatModule";
import { TiStarburst } from "react-icons/ti";
import SubTitle from "../../common/SubTitle";

const MySwal = withReactContent(Swal);

function RoomHeader({
  setJoin,
  data,
  userJoinInfo,
  password,
  token,
  userinfo,
}) {
  const { id, title, participants, sessionOpened, manager } = data;
  const { join, host } = userJoinInfo;

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [joinEnter, setJoinEnter] = useState(false);
  const [joinQuit, setJoinQuit] = useState(false);
  const [deleteData, setDeleteData] = useState(false);
  const [joinId, setJoinId] = useState(0);

  // axios 통신 시 보낼 정보들
  const enterObj = {
    interviewRoomId: id,
    password: password,
  };

  const quitObj = { id: joinId };

  //useAxios
  const [enterRes, enterLoading, enterError] = useAxios(
    //방 참가하기
    `interviewjoins`,
    "POST",
    token,
    enterObj,
    joinEnter
  );

  const deleteResult = useAxios(
    //방 삭제하기
    `interviewrooms/${id}`,
    "DELETE",
    token,
    null,
    deleteData
  );

  const [quitRes, isLoading, errorContext] = useAxios(
    //방 나가기
    `interviewjoins/${userinfo.interviewJoinId}`,
    "DELETE",
    token,
    quitObj,
    joinQuit
  );

  //useEffect
  useEffect(() => {
    setJoinId(userinfo.interviewJoinId);
  }, [userinfo]);

  useLayoutEffect(() => {
    if (enterError) {
      setJoinEnter(false);
    }
    //방 참여하기 성공 후 새로고침
    if (enterRes !== null) {
      setJoinEnter(false);
      if (enterRes.success) {
      } else {
        alert("이미 참가한 방입니다");
      }
    }
  }, [enterRes, enterError]);

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
    // 무한 렌더링 (404오류 뜰 때 useAxios false)
    if (errorContext) {
      setJoinQuit(false);
    }
    //방 탈퇴하기 성공 후 새로고침
    if (quitRes !== null && quitRes.success) {
      window.location.reload();
    }
  }, [quitRes, errorContext]);

  //Event Function
  const joinHandler = (isJoin) => {
    //방 참여하기
    setJoin(isJoin)
    setJoinEnter(true);
  };

  const quitHandler = (isJoin) => {
    //방 탈퇴하기
    setJoin(isJoin)
    setJoinQuit(true);
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
        userinfo: userinfo,
        roomId: id,
        isHost: host,
      },
    });
  };

  const createRoom = () => {
    createSession(id, token).then((res) => {
      if (res.success) {
        window.location.reload();
      }
    });
  };

  //JSX 변수
  const ReadyBtn = (
    <Button text={"스터디 준비하기"} handler={createRoom} isImportant={true} />
  );

  const StartBtn = (
    <Button text={"스터디 시작하기"} handler={moveToRoom} isImportant={true} />
  );

  const QuitBtn = (
    <Button
      text={"나가기"}
      handler={() => {
        quitHandler(false);
      }}
    >
      나가기
    </Button>
  );

  const EnterBtn = (
    <Button
      isImportant={false}
      text={"참여하기"}
      handler={() => joinHandler(true)}
    >
      참여하기
    </Button>
  );

  const StudyStartBtn = (
    <Button
      isImportant={true}
      text={"스터디 시작하기"}
      handler={() => moveToRoom()}
    >
      화상채팅 시작하기
    </Button>
  );
  //화면 렌더링 함수
  const readyRoom = join ? (
    <>
      {sessionOpened ? StudyStartBtn : <p>스터디룸을 준비중입니다</p>}
      {QuitBtn}
    </>
  ) : (
    <>{EnterBtn}</>
  );

  const RoomHost =
    host ? (
      <BtnContainer>
        {participants.length >= 2
          ? sessionOpened
            ? StartBtn
            : ReadyBtn
          : null}
        <Button text={"삭제하기"} handler={deleteRoom} isImportant={false}>
          삭제하기
        </Button>
        <Button text={"수정하기"} handler={showModal}>
          수정하기
        </Button>
        {modalOpen && <EditRoom data={data} setModalOpen={setModalOpen} />}
      </BtnContainer>
    ) : (
      <BtnContainer>{readyRoom}</BtnContainer>
    );

  return (
    <Layout>
      <TiStarburst />
      <Title title={title} />

      <ManagerLayout>
        <SubTitle title={"방장"} />
        <SubTitle title={manager.name} />
      </ManagerLayout>
      {RoomHost}
    </Layout>
  );
}

export default memo(RoomHeader);

const ManagerLayout = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  font-family: "SBAggroL";
  color: var(--greyDark);

  & .SubTitle:first-child {
    color: var(--greyLight-3);
  }

  & .SubTitle:last-child {
    color: var(--greyDark);
  }

  margin-bottom: 3rem;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > p {
    margin-left: 0.3rem;
    color: var(--primary-dark);
  }
`;

const LayoutButton = styled.div`
  width: 10vw;
  height: 8vh;
`;

const Layout = styled.div`
  margin-bottom: 3rem;
  height: inherit;
  padding: 1rem;
  border-radius: 1rem;
  color: var(--primary);
  margin-top: 6vh;

  & .Title {
    font-size: 2rem;
    text-align: left;
    margin-block: 1rem;
    font-family: "SBAggroL";
    color: var(--primary);
  }

  .Btn {
    width: 10rem;
    height: 3.5rem;

    & * {
      font-size: 1rem;
    }
  }

  svg {
    margin-top: 0rem;
    font-size: 2rem;

    path {
      color: var(--primary);
    }
  }
`;
