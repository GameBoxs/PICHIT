import React from "react";
import styled from "styled-components";
import QuestionItem from "./QuestionItem"
import SubTitle from "../../../common/SubTitle"

const QuestionList = ({ Questions,idx }) => {

  return <List>
    <Title>질문목록, {idx}</Title>
    {Questions.map(Question => (
        <QuestionItem Question={Question} key={Question.id} />
    ))}
    </List>;
};

export default QuestionList;
const List = styled.div``;

const Title = styled.div`
  
`