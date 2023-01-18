import React, { useState } from "react";
import styled from "styled-components";

import SubTitle from "../../common/SubTitle";
import { BsQuestionCircleFill } from "react-icons/bs";
import { GrHistory } from "react-icons/gr";
import { MdOutlineLogout } from "react-icons/md";
import Rating from "../../layout/Interview/Rating";

const IntervieweePage = () => {
  const [chatOn, setChatOn] = useState(false);

  const chatHandler = () => {
    setChatOn(!chatOn);
  };

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
        <BodyCompo>
          <IntervieweeCompo>
            <CamCompo>aa</CamCompo>
            <CamCompo>aa</CamCompo>
            <CamCompo>aa</CamCompo>
          </IntervieweeCompo>
          <CamCompo>
            <InterviewerTag>면접자</InterviewerTag>
          </CamCompo>
        </BodyCompo>

        <BodyCompo>
          <QuestionBody>
            <SubNav>
              <SubTitle title={"질문 1"} />
              <TipMark>
                <BsQuestionCircleFill />
              </TipMark>
            </SubNav>

            <Question>
              질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문
            </Question>

            <SubFooter>
              <GrHistory />
              <SubBtn>질문 끝내기</SubBtn>
            </SubFooter>
          </QuestionBody>

          <QuestionBody>
            <SubTitle title={"평가"} />
            <Rating />
          </QuestionBody>

          <QuestionBody>
            <SubTitle title={"피드백"} />
            <Feedback placeholder="피드백을 입력하세요" />
          </QuestionBody>
        </BodyCompo>

        <BodyCompo chatOn={chatOn}>
          <QuestionBody>
            <SubTitle title={"면접자 : 이희수"} />
            <SubBtn>자소서 보기</SubBtn>
          </QuestionBody>
          <QuestionBody>
            <SubNav>
                <SubTitle title={"질문"} />
            </SubNav>
          </QuestionBody>
          <QuestionBody onClick={chatHandler}>
            
          <SubTitle title={"채팅"} />
          </QuestionBody>
        </BodyCompo>
      </InterviewBody>
    </Container>
  );
};

export default IntervieweePage;

const Feedback = styled.textarea`
  width: 100%;
  border-radius: 0 !important;
  border: none;
  margin-top: 2vh;
  margin-right: 1em;
  height: 40vh;
  font-size: 1.2em;
`;

const SubBtn = styled.div`
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 0.6em;
  font-weight: bolder;
  font-size: 0.8em;
  width: fit-content;
`;

const TipMark = styled.div`
  color: #989898;
  font-size: 1.2em;

  &:hover {
    color: #5f5f5f;
  }
`;

const SubFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2vw;
  align-items: center;
`;

const Question = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionBody = styled.div`
  background-color: white;
  padding-block: 2vh;
  padding-inline: 1.5vw;
`;

const InterviewerTag = styled.div`
  background-color: #ccc;
  padding: 0.2em 0.6em;
  position: absolute;
  top: 0.7em;
  left: 1em;
`;

const CamCompo = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntervieweeCompo = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5vw;
`;

const BodyCompo = styled.div`
  --mini-compo: 8vh;
  position: relative;
  height: 84vh;

  &:nth-child(1) {
    margin: 1.5vh 0.5vw 1.5vh 1vw;
    display: grid;
    grid-template-rows: 2fr 7fr;
    gap: 0.5vw;

    div {
      border-radius: 2vw;
    }
  }

  &:nth-child(2) {
    display: grid;
    grid-template-rows: 5fr var(--mini-compo) 7fr;
    gap: 0.5vw;
    margin: 0vh 0.5vw 0vh 0vw;

    div {
      border-radius: 2vw;
    }

    ${QuestionBody}:nth-child(1) {
      display: grid;
      grid-template-rows: 1fr 2fr 1fr;
    }
  }

  &:nth-child(3) {
    display: grid;
    grid-template-rows: var(--mini-compo) ${(props) =>
        props.chatOn ? "4fr 4fr" : "8fr 1fr"};
    transition: 0.5s ease-in-out;
    gap: 0.5vw;
    margin: 0vh 1vw 0vh 0vw;

    * {
      border-radius: 2vw;
    }

    ${SubNav} {
        display: block;
    }

    ${QuestionBody} .SubTitle:last-child {
        margin-top: 0.5vh;
    }
  }

  &:nth-child(2) ${QuestionBody}:nth-child(2), &:nth-child(3) ${QuestionBody}:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
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

const InterviewBody = styled.div`
  background-color: #ccc;
  height: 90vh;
  margin: 0vh 3vw 4vh 3vw;
  border-radius: 3vw;
  gap: 0.5vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  overflow: hidden;

  * {
    border-radius: 3vw;
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
