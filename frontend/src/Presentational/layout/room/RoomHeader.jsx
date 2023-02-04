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
  const { id, title, participants } = data;

  //확인용
  const location = useLocation()

  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [userJoin, setUserJoin] = useState({
    enter : false,
    quit: false
  })
  // axios delete
  const [deleteData, setDeleteData] = useState(false);
  const [joinId, setJoinId] = useState(0);
  // const [goSession, setGoSession] = useState(false);

  const [enterRes] = useAxios(
    `interviewjoins`,
    "POST",
    token,
    {
      interviewRoomId: id,
      password: password,
    },
    userJoin.enter,
    location.pathname
  );

  const deleteResult = useAxios(
    `interviewrooms/${id}`,
    "DELETE",
    token,
    null,
    deleteData,
    location.pathname
  );

  const [quitRes] = useAxios(
    `interviewjoins/${joinId}`,
    "DELETE",
    token,
    { id: joinId },
    userJoin.quit
  );

  // const [getSession] = useAxios(
  //   `conference/sessions/${id}`,
  //   "POST",
  //   token,
  //   {interviewRoomId:id},
  //   goSession
  // )

  // console.log(getSession, '-------------')

  console.log("--------------------------")
  
  useEffect(() => {
    const tempArr = participants.filter(
      (person) => person.name === userinfo.name
    );

    if (tempArr.length !== 0) {
      setJoinId(tempArr[0].interviewJoinId);
    }
  }, [userinfo]);

  useLayoutEffect(() => {
    if (enterRes !== null) {
      if (enterRes.success) {
      } else {
        alert("이미 참가한 방입니다");
      }
    }
  }, [enterRes]);

  useEffect(() => {
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
    if (quitRes !== null && quitRes.success) {
      // window.location.reload();
    }
  }, [quitRes]);

  // roompage에서 받아온 data 값 가공
  const joinHandler = (isJoin) => {
    joinRoom(isJoin);
    setUserJoin({
      enter: true,
      quit: false
    })
  };

  const quitHandler = (isJoin) => {
    joinRoom(isJoin);
    setUserJoin({
      enter: false,
      quit: true
    })
  };

  const showModal = () => {
    setModalOpen(true);
  };

  // const myId = useSelector((state) => state)
  // console.log(myId)

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
        console.log(deleteResult)
      }
    });
  };

  // function deleteRoom() {
  //   setDeleteData(true);
  // }
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (deleteData && deleteData.data) {
  //     setData(deleteData.data);
  //     console.log(deleteData.data)
  //   }
  // },[deleteData])

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

  const moveSession = () => {
    // setGoSession(true)
    navigate("/interview", {
      state: {
        id: userinfo.id,
        roomId: id,
      },
    });
  };

  const RoomHost = host ? (
    <BtnContainer>
  
      {participants.length >= 2 ? (
        <Button
          text={"스터디 시작하기"}
          handler={moveSession}
          isImportant={true}
        >
          화상채팅 시작하기
        </Button>
      ) : null}
      <Button text={"삭제하기"} handler={deleteRoom} isImportant={false}>
        삭제하기
      </Button>
          <Button text={"수정하기"} handler={showModal}>수정하기</Button>
      {modalOpen && <EditRoom data={data} setModalOpen={setModalOpen} />}
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
