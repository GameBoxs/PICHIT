import styled from "styled-components";
import QuestionList from "../../component/room/Question/QuestionList";
import QuestionInsert from "../../component/room/Question/QuestionInsert";
import React, { useState } from "react";
import useAxios from "../../../action/hooks/useAxios";
import { useSelector } from "react-redux";

const QuestionBox = ({idx, userinfo}) => {
  const [Questions, setQuestions] = useState([]);

  // QuestionList: 해당 참가자에게 달려있는 질문 list 목록 
  // QuestionInsert: 질문 입력 칸 

  return (
    <>
      <QuestionList idx={idx} Questions={Questions} />
      <QuestionInsert userinfo={userinfo}/>
    </>
  );
};
export default QuestionBox;
