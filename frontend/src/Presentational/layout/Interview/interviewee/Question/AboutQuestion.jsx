import React from "react";
import styled from "styled-components";
import { QuestionBody, SubNav, SubBtn } from "../StyledCompo";
import SubTitle from "../../../../common/SubTitle";
import { BsQuestionCircleFill } from "react-icons/bs";
import { memo } from "react";

const AboutQuestion = ({ highlight, finishHandler }) => {
  return (
    <QuestionBody>
      <SubNav>
        <SubTitle title={"질문 " + highlight.questionId} />
        <TipMark>
          <BsQuestionCircleFill />
        </TipMark>
      </SubNav>

      <Question>{highlight.questionContent}</Question>

      <SubFooter>
        <SubBtn onClick={finishHandler}>질문 끝내기</SubBtn>
      </SubFooter>
    </QuestionBody>
  );
};

export default memo(AboutQuestion);

const TipMark = styled.div`
  color: var(--greyLight-2);
  font-size: 1.2em;

  path {
    color: var(--greyLight-2);
  }

  &:hover {
    path {
      color: var(--greyDark);
    }
  }
`;

const Question = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2vw;
  align-items: center;
`;
