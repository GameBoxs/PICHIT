import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Component Import Start
import SubTitle from "../../../common/SubTitle";
import ChatArea from "../../../layout/Chat/ChatArea";
import UserVideoComponent from "../../../component/Chat/OpenVidu/UserVideoComponent";
// Component Import End

const BodyArea = ({ session, info }) => {

    function People() {
        return (
          <>
            { info.publisher !== undefined ? (
              <CamCompo>
                <UserVideoComponent streamManager={info.publisher} />
              </CamCompo>
            ) 
            : null }
            { info.subscribers.map((sub, i) => (
              <CamCompo key={i}>
                <UserVideoComponent streamManager={sub} />
              </CamCompo>
            )) }
          </>
        );
    }

    return (
        <InterviewBody>
            <BodyCompo>{People()}</BodyCompo>
            <BodyCompo>
                <SubTitle title={"채팅"} />
                <ChatArea session={session} info={info} />
            </BodyCompo>
        </InterviewBody>
    )
}

export default BodyArea;

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
  }

  &:nth-child(2) {
    margin: 0vh 1vw 0vh 0vw;
    background-color: white;
    padding-block: 2vh;
    height: 83vh;

    & > div:first-child {
      padding-inline: 1.5vw;
    }
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
`;