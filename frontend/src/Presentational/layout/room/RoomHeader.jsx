import styled from "styled-components";
import Title from "../../common/Title";
import PlanTime from "../../component/PlanTime";

import React, { useEffect, useState } from "react";
import EditRoom from "../../component/EditRoom";

import { useSelector } from "react-redux";
import { testToken } from "../../../store/values";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../action/hooks/useAxios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
      <LayoutButton text={"삭제하기"} onClick={deleteRoom}>
        삭제하기
      </LayoutButton>
    </div>
  ) : (
    { readyRoom }
  );

  return (
    <Layout>
      <Title title={title} />
      {RoomHost}
    </Layout>
  );
}

export default RoomHeader;

const LayoutButton = styled.div`
  width: 10vw;
  height: 8vh;
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2),
    -0.2rem -0.2rem 0.5rem var(--white);
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;
  font-weight: 600;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  background-color: var(--primary-light);

  & {
    color: var(--white);
  }

  &:hover {
    color: var(--primary);
  }

  &:active {
    box-shadow: inset 0.2rem 0.2rem 0.5rem var(--greyLight-2),
      inset -0.2rem -0.2rem 0.5rem var(--white);
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;

  & .Title {
    font-weight: 600;
    font-size: 3rem;
  }

  & div:nth-child(2) {
    width: 7rem;
    height: 3rem;

    & * {
      font-size: 1rem;
    }
  }
`;
const ButtonSection = styled.div`
  display: flex;
`;
