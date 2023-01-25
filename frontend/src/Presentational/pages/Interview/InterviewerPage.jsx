import React from "react";
import styled from "styled-components";

// import Screen from "../../layout/Interview/Screen";
import SubTitle from "../../common/SubTitle";
import ChatArea from "../../layout/Chat/ChatArea";

import { MdOutlineLogout } from "react-icons/md";

const InterviewerPage = () => {
  const peopleNumb = 4;
  const People = Array(peopleNumb)
    .fill()
    .map((_, idx) => {
      return (
        <CamCompo key={idx}>
          {idx === peopleNumb - 1 ? (
            <InterviewerTag>면접자</InterviewerTag>
          ) : null}
          HIHI
        </CamCompo>
      );
    });

  return (
    <Container>
      <InterviewNav>
        <NavCompo></NavCompo>
        <NavCompo>SpeakOn</NavCompo>
        <NavCompo>
          <div>총 시간&nbsp;00:00:00</div>
          <MdOutlineLogout />
        </NavCompo>
      </InterviewNav>

      <InterviewBody>
        <BodyCompo>{People}</BodyCompo>
        <BodyCompo>
          <SubTitle title={"채팅"} />
          <ChatArea />
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
    height: 80vh;
    
     & > div:first-child{
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
  background-color: #ccc;
  height: 90vh;
  margin: 0vh 3vw 4vh 3vw;
  border-radius: 3vw;
  gap: 0.5vw;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  overflow: hidden;

  &, ${BodyCompo}, ${CamCompo}, ${InterviewerTag} {
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

  &:nth-child(3) {
    justify-content: flex-end;
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

  & .SubTitle {
    font-size: 1em;
    font-weight: bolder;
  }
`;
