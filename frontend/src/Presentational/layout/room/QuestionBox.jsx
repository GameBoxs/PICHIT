import styled from "styled-components";
import QuestionList from "../../component/QuestionList";
import QuestionInsert from "../../component/QuestionInsert";
import React, { useState } from "react";

let nextId = 3;
let kimName = "Kim jh 남자의";

const QuestionBox = () => {
  const [Questions, setQuestions] = useState([
    {
      id: 1,
      name: "Kim jh 남자의",
      text: "남자의 길을 간다.",
    },
    {
      id: 2,
      name: "Kim jh 남자의",
      text: "왜냐하면 나는 상남자니까",
    },
  ]);

  const onInsert = (text) => {
    if (text === "") {
      return alert("질문을 입력해주세요");
    } else {
      const Question = {
        id: nextId,
        name: kimName,
        text,
      };
      setQuestions(Questions => Questions.concat(Question));
      // push 함수가 아닌 concat 함수를 사용한 이유는
      // 변경되기 전에 값을 기억하고 있어야 하기때문에.. (상태 불면성을 지켜주기 위해)
      // push함수는 해당 배열 자체가 변경되고
      //concat 함수를 사용하면 새 배열이 리턴되고 기존 배열은 변경이 되지 않음
      nextId++;
    }
  };

  return (
    <>
      <QuestionList Questions={Questions} />
      <QuestionInsert onInsert={onInsert} />
    </>
  );
};
export default QuestionBox;
