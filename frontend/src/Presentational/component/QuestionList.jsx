import React from "react";
import styled from "styled-components";
import QuestionItem from "./QuestionItem"

const QuestionList = ({ Questions }) => {

  return <List>
    {Questions.map(Question => (
        <QuestionItem Question={Question} key={Question.id} />
    ))}
    </List>;
};

export default QuestionList;
const List = styled.div``;
