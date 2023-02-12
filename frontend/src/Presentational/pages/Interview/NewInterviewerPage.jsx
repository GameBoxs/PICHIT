// ETC Import Start
import React, { useEffect } from "react";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
// ETC Import End

// CustomHook Import Start
import NavArea from "../../layout/Interview/NavArea";
import BodyArea from "../../layout/Interview/Interviewer/BodyArea";
import { leaveSession } from "../../../action/modules/chatModule";
// CustomHook Import End

// Module Import Start

// Module Import End

const NewInterviewerPage = (props) => {
    const {session, setOV, info, myToken, roomStateData } = props;
    const roomInfo = JSON.parse(sessionStorage.getItem('roomInfo'));
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("beforeunload", (e) => {
            console.log('변경 감지@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
            e.stopPropagation();
            leaveSession(session, setOV);
            navigate('/interview',{state:{},replace:true});
            window.location.reload();
            e.returnValue='';
        });
        return () => {
            window.removeEventListener("beforeunload", (e) => {
                console.log('변경 감지@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
                e.stopPropagation();
                leaveSession(session, setOV);
                navigate('/interview',{state:{},replace:true});
                window.location.reload();
                e.returnValue='';
            });
        };
    }, [props]);

    return (
        <Container>
            <NavArea isHost={roomInfo.isHost} info={info} myToken={myToken}/>
            <BodyArea session={session} info={info} roomStateData={roomStateData}/>
        </Container>
    )
}

export default NewInterviewerPage;

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