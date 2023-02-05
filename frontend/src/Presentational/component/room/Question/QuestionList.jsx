import React from "react";
import styled from "styled-components";
import QuestionItem from "./QuestionItem";
import SubTitle from "../../../common/SubTitle";
import AggroL from "../../../common/Font/AggroL";

const QuestionList = ({ Questions }) => {
  return (
    <List>
      <AggroL />
      <Title>
        <div>질문</div>
        <div>{Questions?.length}</div>
      </Title>
      {Questions.map((Question) => (
        <QuestionItem Question={Question} key={Question.id} />
      ))}
    </List>
  );
};

export default QuestionList;
const List = styled.div``;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  font-family: SBagrroL;
  color: var(--greyDark);
`;
