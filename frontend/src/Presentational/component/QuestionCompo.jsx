import React from "react";
import styled from "styled-components";
import SubTitle from "../common/SubTitle";

const QuestionCompo = ({ questionInfo }) => {
  const { id, question, user } = questionInfo;

  return (
    <QuestionBody>
      <SubTitle title={`질문 ${id}`} />
      <MainQuestion>{question}</MainQuestion>
      <UserInfo>{user}</UserInfo>
    </QuestionBody>
  );
};

export default QuestionCompo;

const UserInfo = styled.div`
    width: 100%;
    text-align: right;
    font-size: 0.85em;
`;

const MainQuestion = styled.div`
    margin-block: 0.5em;
`;

const QuestionBody = styled.div`
  padding: 3vh 1vh 2vh 1vh;
  border-bottom: solid 1px #ccc;

  & .SubTitle {
    font-size: 0.85em;
    margin-bottom: 1vh;
  }

  &:nth-child(1) {
    margin-top: 0;
  }

  &:last-child {
    border: none;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;
