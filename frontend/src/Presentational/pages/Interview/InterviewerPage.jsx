/* ETC Import */
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/* Component Import */
import NavArea from "../../layout/Interview/NavArea";
import BodyArea from "../../layout/Interview/Interviewer/BodyArea";

/* Module Import */
import { leaveSession } from "../../../action/modules/chatModule";

const InterviewerPage = (props) => {
    /* Page 이동을 위한 navigate */
    const navigate = useNavigate();
    /* props destructuring */
    const {session, setOV, info, myToken, roomStateData } = props;
    /* Session Storage에 저장된 roomInfo key에 해당하는 value를 roomInfo에 저장 */
    const roomInfo = JSON.parse(sessionStorage.getItem('roomInfo'));

    /* 세션 종료 함수로 usecallback을 사용하여 1회만 함수가 생성되도록 함, props를 의존성으로 넣음 */
    const outSession = useCallback(() => {
        /* OpenVidu 세션 종료 */
        leaveSession(session, setOV);
        navigate('/interview',{state:{},replace:true});
        window.location.reload();
    },[props]);
  
    /* props가 변경될 때 실행 */
    useEffect(() => {
        /* 브라우저가 종료 되기 전 감지하는 윈도우 이벤트 리스너 추가, 실행할 함수는 outSession */
        window.addEventListener("beforeunload", outSession);
        /* unMount 될 때 실행 */
        return () => {
            /* 다른 페이지에서 위에 추가한 윈도우 이벤트가 남아 있으면 안되므로 제거 */
            window.removeEventListener("beforeunload", outSession);
        };
    }, [props]);

    return (
        <Container>
            <NavArea isHost={roomInfo.isHost} info={info} myToken={myToken}/>
            <BodyArea session={session} info={info} roomStateData={roomStateData}/>
        </Container>
    )
}

export default InterviewerPage;

/* Styled-Component */
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