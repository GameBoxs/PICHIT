import React from "react";
import styled from "styled-components";
import { QuestionBody, SubNav, SubBtn } from "../StyledCompo";
import SubTitle from "../../../../common/SubTitle";
import { BsQuestionCircleFill } from "react-icons/bs";
import { memo } from "react";

const AboutQuestion = ({ highlight, finishHandler }) => {
  // 질문 보여주기
  return (
    <QuestionBody>
      <SubNav>
        <SubTitle title={"질문 " + highlight.questionId} />
        <TipMark>
          <BsQuestionCircleFill />
        </TipMark>
      </SubNav>

      {/* 질문 상세 내용 */}
      <Question>{highlight.questionContent}</Question>

      {/* Question Controller */}
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
  cursor: pointer;

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
