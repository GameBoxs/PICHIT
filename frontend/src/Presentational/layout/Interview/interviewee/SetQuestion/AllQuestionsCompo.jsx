import React from "react";
import styled from "styled-components";
import { QuestionBody, SubNav } from "../StyledCompo";
import SubTitle from "../../../../common/SubTitle";
import QuestionCompo from "../../../../component/QuestionCompo";
import { memo } from "react";

function AllQuestionsCompo(props) {
  const { chatOn, members, reqBody, setReqBody, questionData } = props;

  //질문자 선택 함수
  const setQuestioner = (elem) => {
    setReqBody((prev) => {
      return { ...prev, writerId: elem.id };
    });
  };

  const Questions = questionData.map((el, id) => {
    return (
      <QuestionCompo
        key={id}
        questionInfo={el}
        roomID={reqBody.interviewRoomId}
        intervieweeID={reqBody.intervieweeId}
      />
    );
  });

  //질문 컴포넌트 상단 면접관들 목록 보여주는 함수
  const interviewees =
    members.interviewers !== {}
      ? members.interviewers.map((elem, idx) => {
          return (
            <React.Fragment key={idx}>
              <input
                type="radio"
                name={`radio`}
                value={elem.id}
                id={`tab-${idx + 1}`}
                onClick={() => {
                  setQuestioner(elem);
                }}
              />
              <label htmlFor={`tab-${idx + 1}`}>
                <p>{elem.name}</p>
              </label>
            </React.Fragment>
          );
        })
      : null;

  return (
    <QuestionBody>
      <SubNav>
        <SubTitle title={"질문"} />
      </SubNav>
      <Member>
        {interviewees}
        <MemberColor></MemberColor>
      </Member>
      {/* <AllQuestions chatOn={chatOn} onClick={QuestionHandler}> */}
      {reqBody.writerId !== 0 ? (
        <AllQuestions chatOn={chatOn}>{Questions}</AllQuestions>
      ) : (
        "Loading"
      )}
    </QuestionBody>
  );
}

export default memo(AllQuestionsCompo);

const MemberColor = styled.div``;

const Member = styled.div`
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  width: 20.4rem;
  margin-top: 1rem;
  margin-bottom: 0;
  border-radius: 1rem !important;
  display: flex;
  align-items: center;
  position: relative;

  & input {
    display: none;
  }

  & > input:checked + label {
    transition: all 0.5s ease;
    color: var(--primary);
  }

  & label {
    width: 5rem;
    height: 2rem;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--greyDark);
    transition: all 0.5s ease;

    &:hover {
      color: var(--primary);
    }
  }

  ${MemberColor} {
    position: absolute;
    height: 2rem;
    width: 5rem;
    border-radius: 0.8rem !important;
    box-shadow: inset 0.2rem 0.2rem 0.5rem var(--greyLight-2),
      inset -0.2rem -0.2rem 0.5rem var(--white);
    pointer-events: none;
  }

  #tab-1:checked ~ ${MemberColor} {
    transform: translateX(0);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  #tab-2:checked ~ ${MemberColor} {
    transform: translateX(5rem);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  #tab-3:checked ~ ${MemberColor} {
    transform: translateX(10rem);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;

const AllQuestions = styled.div`
  width: 100%;
  height: calc(100% - ${(props) => (props.chatOn ? "60%" : "20%")});
  margin-top: 2vh;
  overflow-y: scroll;
  border-radius: 0 !important;

  & * {
    border-radius: 0 !important;
  }

  &::-webkit-scrollbar {
    width: 7px;
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--greyLight-2);
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--greyLight-1);
  }
`;
