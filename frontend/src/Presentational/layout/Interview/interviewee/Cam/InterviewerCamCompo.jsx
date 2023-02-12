import React from "react";
import styled from "styled-components";
import { CamCompo } from "../StyledCompo";
import UserVideoComponent from "../../../../component/Chat/OpenVidu/UserVideoComponent";
import { memo } from "react";

const InterviewerCamCompo = ({info}) => {
  return (
      <CamCompo>
        <InterviewerTag>면접자</InterviewerTag>
        {info.subscribers.map((sub, i) =>
          // sub.stream.connection.connectionId === info.interviewee ? (
          JSON.parse(sub.stream.connection.data).clientId.toString() ===
          info.interviewee.toString() ? (
            <CamCompo key={i}>
              <UserVideoComponent streamManager={sub} />
            </CamCompo>
          ) : null
        )}
      </CamCompo>
  );
};

export default memo(InterviewerCamCompo);

const InterviewerTag = styled.div`
  padding: 0.2em 0.6em;
  position: absolute;
  font-weight: 600;
  top: 0.7em;
  left: 1em;
  background: var(--greyLight-1);
  color: var(--primary);
  z-index: 10;
`;