import React, { memo, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { leaveSession } from "../../../action/modules/chatModule";
import NavArea from "../../layout/Interview/NavArea";
import BodyArea from "../../layout/Interview/interviewee/BodyArea";

const IntervieweePage = (props) => {
  const { session, setSession, OV, setOV, info, setInfo, roomStateData } =
    props;
  const token = useSelector((state) => state.token);
  const roomInfo = JSON.parse(sessionStorage.getItem("roomInfo"));

  const navigate = useNavigate();

  const outSession = useCallback(() => {
      leaveSession(session, setOV);
      navigate('/interview',{state:{},replace:true});
      window.location.reload();
  },[props]);

  useEffect(() => {
      window.addEventListener("beforeunload", outSession);
      return () => {
          window.removeEventListener("beforeunload", outSession);
      };
  }, [props]);
  // useEffect(() => {
  //   window.addEventListener("beforeunload", (e) => {
  //     leaveSession(session, setOV);
  //     navigate("/interview", { state: {}, replace: true });
  //     window.location.reload();
  //   });

  //   return () => {
  //     window.removeEventListener("beforeunload", (e) => {
  //       leaveSession(session, setOV);
  //       navigate("/interview", { state: {}, replace: true });
  //       window.location.reload();
  //     });
  //   };
  // }, []);

  return (
    <Container>
      <NavArea isHost={roomInfo.isHost} info={info} myToken={token} />
      <BodyArea
        info={info}
        roomInfo={roomInfo}
        session={session}
        token={token}
        roomStateData={roomStateData}
      />
    </Container>
  );
};

export default memo(IntervieweePage);

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

  & * {
    transition: ease 0.1s;
  }

  & .SubTitle {
    color: var(--textColor);
  }
`;
