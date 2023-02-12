import React from "react";
import styled from "styled-components";
import { memo } from "react";
import { QuestionBody } from "../StyledCompo";
import SubTitle from "../../../../common/SubTitle";

function AboutFeedBack({feedback, setFeedback}) {
  const changeFeedBack = (e) => {
    setFeedback((prev) => {
      return {
        ...prev,
        feedbackContext: e.target.value,
      };
    });
  };

  return (
    <QuestionBody>
      <SubTitle title={"피드백"} />
      <Feedback
        placeholder="피드백을 입력하세요"
        value={feedback}
        onChange={changeFeedBack}
      />
    </QuestionBody>
  );
}

export default memo(AboutFeedBack);

const Feedback = styled.textarea`
  width: 100%;
  border-radius: 0 !important;
  border: none;
  margin-top: 2vh;
  margin-right: 1em;
  height: 40vh;
  font-size: 1.2em;
  resize: none;
  outline: none;
`;
