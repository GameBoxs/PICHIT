/* ETC Import */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { MdOutlineLogout } from "react-icons/md";

/* Component Import */
import TotalTimer from "../../component/Interview/Interviewer/TotalTimer";

/* Module Import */
import useAxios from "../../../action/hooks/useAxios";

const NavArea = ({ isHost, info, myToken }) => {
  /* Session Storage에 저장된 roomInfo key에 해당하는 value를 roomInfo에 저장 */
  const roomInfo = JSON.parse(sessionStorage.getItem("roomInfo"));
  /* 인터뷰 종료 Execute Flag */
  const [closeExecute, setCloseExecute] = useState(false);
  /* 인터뷰 종료 custom hook Axios */
  let [closeData, closeIsLoading, closeError] = useAxios(
    "conference/interview/end",
    "POST",
    myToken,
    {
      interviewRoomId: roomInfo.roomId,
      intervieweeId: info.interviewee,
      questionId: "",
      questionContent: "",
    },
    closeExecute
  );

  /* closeExecute,closeIsLoading 변경 감지 */
  useEffect(() => {
    /* closeExecute가 true, closeIsLoading이 false일 때 */
    if (closeExecute && closeIsLoading === false) {
      /* 만약 Axios 이후 에러가 있을 때 */
      if(closeError && closeError.response.data.message) {
        Swal.fire({
          title: "인터뷰 종료 에러!",
          html:`${closeError.response.data.message} <br/> 종료 전 질문 끝내기 버튼을 눌러 질문을 종료해 주세요.`,
          icon: "error",
          showCancelButton: false,
          showConfirmButton: false,
          timer:3000,
        })
      }
      setCloseExecute(false);
      /* 에러 내용 비우기 */
      closeError='';
    }
  }, [closeExecute,closeIsLoading]);

  /* 면접종료 후 대기실 돌아가는 함수 */
  const finishInterviewe = () => {
    Swal.fire({
      title: "현재 면접을 종료하고 대기실로 돌아갑니다.",
      text: "대기실로 가기 전에 모든 질문이 끝났는지 확인해 주세요.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "취소",
      showConfirmButton: true,
      confirmButtonText: "확인",
    }).then((result) => {
      if (result.isConfirmed) {
        setCloseExecute(true);
      }
    });
  };

  return (
    <InterviewNav>
      <NavCompo></NavCompo>
      <NavCompo>Pitchit</NavCompo>
      <NavCompo>
        <div></div>
        <TotalTimer />
        {isHost ? (
          <MdOutlineLogout className="logOutBtn" onClick={finishInterviewe} />
        ) : null}
      </NavCompo>
    </InterviewNav>
  );
};

export default NavArea;

/* Styled-Component */
const InterviewNav = styled.div`
  height: 5vh;
  margin: 1vw 3vw 1vw 3vw;
  padding-inline: 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & svg {
    font-size: 1.3em;
  }
`;

const NavCompo = styled.div`
  gap: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 20vw;

  &:nth-child(2) {
    font-weight: 600;
    color: var(--primary);
  }

  &:nth-child(3) {
    display: grid;
    grid-template-columns: 10fr 5fr 1fr;
    justify-content: center;
    grid-gap: 1vw;

    & * {
      color: var(--greyDark);
    }
  }

  .logOutBtn {
    cursor: pointer;

    &:hover * {
      color: var(--primary);
    }
  }
`;
