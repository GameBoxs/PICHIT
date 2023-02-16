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
        <Tooltip>
          우측에서 질문을 선택할 수 있습니다.
          <br />
          모든 팀원에게 선택된 질문이 뜨며,
          <br />
          질문 끝내기를 통해 질문을 종료하고
          <br />
          피드백을 마칠 수 있습니다.
          <br />
          끝난 질문은 다시 못하니 유의해주세요!{" "}
        </Tooltip>
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

const Tooltip = styled.div`
  position: absolute;
  right: -7.5rem;
  top: 4rem;
  padding: 1.5rem;
  line-height: 1.7rem;
  color: var(--white);
  background-color: var(--textColor);
  opacity: 0.8;
  width: 20rem;
  z-index: 20;
  font-weight: lighter;
  display: none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  
  &:before {
		pointer-events: none;
		position: absolute;
		z-index: -1;
		content: '';
		border-style: solid;
		left: 10rem;
    top: -20px;
		border-width: 0 10px 20px 10px;
		border-color: transparent transparent var(--textColor) transparent;
		transition-property: top;
	}
`;

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

    ~ ${Tooltip} {
      display: block;
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
