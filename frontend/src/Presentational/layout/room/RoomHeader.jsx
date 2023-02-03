import React, { useEffect, useState } from "react";

import styled from "styled-components";
import Title from "../../common/Title";
import Button from "../../common/Button";
import EditRoom from "../../component/EditRoom";

import { useSelector } from "react-redux";
import { testToken } from "../../../store/values";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../action/hooks/useAxios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AggroL from "../../common/Font/AggroL";

const MySwal = withReactContent(Swal);

function RoomHeader({ join, joinRoom, data, host }) {
  let navigate = useNavigate();

  console.log(data);
  // console.log(roomData)

  // roompage에서 받아온 data 값 가공
  const title = data.title;
  const startDate = data.startDate;

  const joinHandler = () => {
    joinRoom(!join);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  // axios delete
  const roomId = data.id;
  const token = useSelector((state) => state.token);

  const [deleteData, setDeleteData] = useState(false);
  const deleteResult = useAxios(
    `interviewrooms/${roomId}`,
    "DELETE",
    token,
    null,
    deleteData
  );
  console.log(deleteResult);

  useEffect(() => {
    // setDeleteData();
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

  // const deleteRoom = () => {
  //   MySwal.fire({
  //     text: "면접방을 정말 삭제하시겠습니까?",
  //     showConfirmButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: "삭제",
  //     cancelButtonText: "취소",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       setDeleteData(true);
  //     }
  //   });
  // };

  function deleteRoom() {
    setDeleteData(true);
  }
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (deleteData && deleteData.data) {
  //     setData(deleteData.data);
  //     console.log(deleteData.data)
  //   }
  // },[deleteData])

  const readyRoom = join ? (
    <LayoutButton text={"나가기"}>나가기</LayoutButton>
  ) : (
    <LayoutButton isImportant={false} text={"참여하기"} onClick={joinHandler}>
      참여하기
    </LayoutButton>
  );

  const RoomHost = host ? (
    <div>
      {/* <LayoutButton text={"수정하기"} onClick={showModal}>수정하기</LayoutButton>
      <button onClick={showModal} >수정하기</button>
      {modalOpen && <EditRoom data={data} setModalOpen={setModalOpen} />} */}
      {/* <LayoutButton text={"삭제하기"} onClick={deleteRoom}> */}
      <Button text={"삭제하기"} handler={deleteRoom} isImportant={false}>
        삭제하기
      </Button>
      {/* </LayoutButton> */}
    </div>
  ) : (
    { readyRoom }
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

  & div:nth-child(2) {
    width: 7rem;
    height: 3rem;

    & * {
      font-size: 1rem;
    }
  }
`;
