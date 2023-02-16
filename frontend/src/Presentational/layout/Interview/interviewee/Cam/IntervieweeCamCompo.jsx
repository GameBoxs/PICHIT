import React from "react";
import styled from "styled-components";
import { CamCompo } from "../StyledCompo";
import UserVideoComponent from "../../../../component/Chat/OpenVidu/UserVideoComponent";
import { memo } from "react";

const IntervieweeCamCompo = ({info}) => {
  let cnt = 3 - info.subscribers.length;

  function makeBlank() {
    let result = [];
    for (let i = 0; i < cnt; i++) {
      result.push(<CamCompo className="in" key={i} />);
    }
    return result;
  }

  return (
    <IntervieweeCompo>
      <CamCompo className="in">
        <UserVideoComponent streamManager={info.publisher} />
      </CamCompo>
      {info.subscribers.map((sub, i) =>
        JSON.parse(sub.stream.connection.data).clientId.toString() ===
        info.interviewee.toString() ? null : (
          <CamCompo className="in" key={i}>
            <UserVideoComponent streamManager={sub} />
          </CamCompo>
        )
      )}
      {makeBlank()}
    </IntervieweeCompo>
  );
};

export default memo(IntervieweeCamCompo);

const IntervieweeCompo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 0.5vw;
  object-fit: cover !important;

  .in {
    background-color: var(--greyLight-3);

    * {
      width: inherit;
      height: 100%;
    }

    div div {
      height: 100%;
      width: inherit;
    }

    & video {
      object-fit: cover !important;
      width: inherit;
      height: 100%;
    }
  }
`;
