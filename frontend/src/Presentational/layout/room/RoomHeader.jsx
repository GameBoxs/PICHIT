import styled from "styled-components";
import Title from "../../common/Title";
import PlanTime from "../../component/PlanTime";

import React, { useEffect, useState } from "react";
import EditRoom from "../../component/EditRoom";
import { useSelector } from "react-redux";
import { testToken } from "../../../store/values";
import useAxios from "../../../action/hooks/useAxios";
import { useNavigate } from "react-router-dom";

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
  // if (result[0] && result[0].success && result[0].success !== undefined) {
  //   navigate("/");
  // }

  // const deleteAlert =

  const deleteRoom = () => {
    MySwal.fire({
      title: "면접방을 정말 삭제하시겠습니까?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "면접방이 삭제 되었습니다.",
          showConfirmButton: true,
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
        setDeleteData(true);
        if (deleteResult[0] && deleteResult[0].success && deleteResult[0].success !== undefined) {
          navigate("/");
        }
      }
    });
  };
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (deleteData && deleteData.data) {
  //     setData(deleteData.data);
  //     console.log(deleteData.data)
  //   }
  // },[deleteData])

  const readyRoom = join ? (
    <button>나가기</button>
  ) : (
    <button onClick={joinHandler}>참여하기</button>
  );

  const RoomHost = host ? (
    <div>
      <button onClick={showModal}>수정하기</button>
      {modalOpen && <EditRoom data={data} setModalOpen={setModalOpen} />}
      <button onClick={deleteRoom}>삭제하기</button>
    </div>
  ) : (
    { readyRoom }
  );

  return (
    <>
      <Layout>
        <Left>
          <Title title={title} />
          <Title title={startDate} />
        </Left>
        {RoomHost}
      </Layout>
    </>
  );
}

export default RoomHeader;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  border-bottom: 2px solid gray;
`;
const Left = styled.div`
  display: inline-flex;
  align-items: center;
`;
