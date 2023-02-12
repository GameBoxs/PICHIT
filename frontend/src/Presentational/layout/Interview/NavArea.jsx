import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TotalTimer from "../../component/Interview/Interviewer/TotalTimer";
import { MdOutlineLogout } from "react-icons/md";

import Swal from "sweetalert2";
import useAxios from "../../../action/hooks/useAxios";

const NavArea = ({isHost, info, myToken}) => {
  const roomInfo = JSON.parse(sessionStorage.getItem('roomInfo'));
  const [closeExecute, setCloseExecute] = useState(false);
  const [closeData, closeIsLoading, closeError] = useAxios(
      'conference/interview/end',
      "POST",
      myToken,
      {
          interviewRoomId : roomInfo.roomId,
          intervieweeId : info.interviewee,
          questionId : "",
          questionContent : ""
      },
      closeExecute
  )

  useEffect(()=> {
      if(closeExecute) setCloseExecute(false);
  },[closeExecute])

  const finishInterviewe = () => {
    console.log('info가 뭔데 ',info);
      Swal.fire({
        title: "현재 면접을 종료하고 대기실로 돌아갑니다.",
        text:'대기실로 가기 전에 모든 질문이 끝났는지 확인해 주세요.',
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
  }

  return (
      <InterviewNav>
          <NavCompo></NavCompo>
          <NavCompo>Pitchit</NavCompo>
          <NavCompo>
              <TotalTimer />
              {
                  isHost ?
                  <MdOutlineLogout
                      className="logOutBtn"
                      onClick={finishInterviewe}
                  />
                  : null
              }
          </NavCompo>
      </InterviewNav>
  )
}

export default NavArea;

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
    justify-content: flex-end;

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
