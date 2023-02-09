import React from "react";
import styled from "styled-components";

// import Screen from "../../layout/Interview/Screen";
import SubTitle from "../../common/SubTitle";
import ChatArea from "../../layout/Chat/ChatArea";

import { MdOutlineLogout } from "react-icons/md";

import { useState } from "react";
import { leaveSession } from "../../../action/modules/chatModule";
import UserVideoComponent from "../../component/Chat/OpenVidu/UserVideoComponent";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../action/hooks/useAxios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const InterviewerPage = ({ session, setSession, OV, setOV, info, setInfo }) => {
  const {userinfo, roomId, isHost} = useLocation().state;
  const token = useSelector((state) => state.token);
  let navigate = useNavigate();

  // const peopleNumb = 4;
  // const People = Array(peopleNumb)
  //   .fill()
  //   .map((_, idx) => {
  //     return (
  //       <CamCompo key={idx}>
  //         {idx === peopleNumb - 1 ? (
  //           <InterviewerTag>면접자</InterviewerTag>
  //         ) : null}
  //         HIHI
  //       </CamCompo>
  //     );
  //   });
  
  function People() {
    let cnt = 3 - info.subscribers.length;
    function makeBlank() {
      let result = [];
      for (let i = 0; i < cnt; i++) {
        result.push(<CamCompo></CamCompo>);
      }
      return result;
    }
    return (
      <>
        {info.publisher !== undefined ? (
          <CamCompo>
            <UserVideoComponent streamManager={info.publisher} />
          </CamCompo>
        ) : null}
        {info.subscribers.map((sub, i) => (
          <CamCompo>
            <UserVideoComponent streamManager={sub} />
          </CamCompo>
        ))}
        {makeBlank()}
      </>
    );
  }

  const [closeExecute, setCloseExecute] = useState(false);
  const [closeData, closeIsLoading, closeError] = useAxios(
    'conference/interview/end',
    "POST",
    token,
    {
      interviewRoomId : roomId,
      intervieweeId : info.interviewee,
      questionId : "",
      questionContent : ""
    },
    closeExecute
  )

  const finishInterviewe = () => {
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
        // session.signal({
        //   data:'',
        //   to:[],
        //   type: 'moveToSelect'
        // })
      }
    });
  }

  return (
    <Container>
      <InterviewNav>
        <NavCompo></NavCompo>
        <NavCompo>Pitchit</NavCompo>
        <NavCompo>
          <div>00:00:00</div>
          {
            isHost ?
            <MdOutlineLogout
              className="logOutBtn"
              onClick={() => {
                // leaveSession(session, setOV);
                // navigate("/room");
                finishInterviewe();
              }}
            />
            : null
          }
        </NavCompo>
      </InterviewNav>

      <InterviewBody>
        <BodyCompo>{People()}</BodyCompo>
        <BodyCompo>
          <SubTitle title={"채팅"} />
          <ChatArea session={session} info={info} />
        </BodyCompo>
      </InterviewBody>
    </Container>
  );
};

export default InterviewerPage;

const InterviewerTag = styled.div`
  background-color: #ccc;
  padding: 0.2em 0.6em;
  position: absolute;
  top: 1em;
  left: 1em;
`;

const CamCompo = styled.div`
  position: relative;
  background-color: white;
  width: 30vw;
  height: 41vh;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover !important;

 div {
    height: 100%;
    width: inherit;
  }

  & video {
    object-fit: cover !important;
    width: inherit;
    height: 100%;
  }

`;

const BodyCompo = styled.div`
  --mini-compo: 8vh;
  position: relative;
  height: 84vh;

  &:nth-child(1) {
    margin: 1.5vh 0.5vw 1.5vh 1vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5vw;
    justify-content: center;
    align-items: center;

    /* > div {
      width: 100%;
      height: 100%; */

    /* .ScreenChild {
        width: 30vw;
        height: 40.5vh;
        font-size: 1.5em;

        div {
        top: 29vh;
        left: 16vw;
        }
      } */
    /* } */
  }

  &:nth-child(2) {
    margin: 0vh 1vw 0vh 0vw;
    background-color: white;
    padding-block: 2vh;
    /* padding-inline: 1.5vw; */
    height: 83vh;

    & > div:first-child {
      padding-inline: 1.5vw;
    }

    /*
    & > div:last-child {
      div:last-child{
        padding-inline: 1.5vw;
      }
    } */
  }
`;

const InterviewBody = styled.div`
  background-color: var(--greyLight-1);
  height: 90vh;
  margin: 0vh 3vw 4vh 3vw;
  border-radius: 3vw;
  gap: 0.5vw;
  display: grid;
  grid-template-columns: 2fr 1fr;
  box-shadow: 0.8rem 0.8rem 1.4rem var(--greyLight-2),
    -0.2rem -0.2rem 1.8rem var(--greyLight-2);
  align-items: center;
  overflow: hidden;

  &,
  ${BodyCompo}, ${CamCompo}, ${InterviewerTag} {
    border-radius: 2vw;
  }

  /* * > div:nth-child(2) {
    * {
      border-radius: 0 ; 
    }
  } */
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

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--greyLight-1);

  & .SubTitle {
    font-size: 1em;
    font-weight: bolder;
  }
`;
