import styled from "styled-components";
import QuestionList from "../../component/room/Question/QuestionList";
import QuestionInsert from "../../component/room/Question/QuestionInsert";
import React, { useState } from "react";
import useAxios from "../../../action/hooks/useAxios";
import { useSelector } from "react-redux";

const QuestionBox = ({idx, userinfo}) => {
  const [Questions, setQuestions] = useState([]);

  return (
    <>
      <QuestionList idx={idx} Questions={Questions} />
      <QuestionInsert userinfo={userinfo}/>
    </>
  );
};
export default QuestionBox;
