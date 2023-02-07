import React, { useEffect, useState } from "react";
import { memo } from "react";
import styled from "styled-components";
import SubTitle from "../common/SubTitle";

import useAxios from "../../action/hooks/useAxios";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
const MySwal = withReactContent(Swal);

const QuestionCompo = ({ questionInfo, roomID, intervieweeID }) => {
  console.log('questionInfo --- ',questionInfo);
  const { id, content, writer, permission, finished } = questionInfo;
  const token = useSelector((state) => state.token);
  const [execute, setExecute] = useState(false);

  // permission이 false면 단순히 보기만 가능 클릭 기능 빼야함, true 여야 클릭하여 모달띄워서 제출 가능.
  // finished가 false면 클릭하여 제출 할 수 있음, true면 클릭 불가, 회색으로 활성화 됬다는거 표시 해야함.

  const [res] = useAxios(
    'conference/interview/question/propose',
    "POST",
    token,
    {
      interviewRoomId : roomID,
      intervieweeId : intervieweeID,
      questionId : id
    },
    execute
  )

  useEffect(()=> {
    if(execute) setExecute(false);
  },[execute])

  console.log(res);
  
  const QuestionHandler = (QuestionsID) => {
    if( permission && finished === false){
      MySwal.fire({
        title: "질문을 제출 하시겠습니까?",
        // text: content,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "취소",
        showConfirmButton: true,
        confirmButtonText: "승인",
        html: (
          <div>
            <div>질문 내용 - ({id}) {content}</div>
          </div>
        ),
      }).then((result) => {
        if (result.isConfirmed) {
          setExecute(true);
        }
      });
    }
  };

  return (
    <QuestionBody onClick={QuestionHandler}>
      <SubTitle title={`질문 ${id}`} />
      <MainQuestion>{content}</MainQuestion>
      <UserInfo>{writer.name}</UserInfo>
    </QuestionBody>
  );
};

export default memo(QuestionCompo);

const UserInfo = styled.div`
    width: 100%;
    text-align: right;
    font-size: 0.85em;
`;

const MainQuestion = styled.div`
    margin-block: 0.5em;
`;

const QuestionBody = styled.div`
  padding: 3vh 1vh 2vh 1vh;
  border-bottom: solid 1px var(--greyLight-2);

  & .SubTitle {
    font-size: 0.85em;
    margin-bottom: 1vh;
  }

  &:nth-child(1) {
    margin-top: 0;
  }

  &:last-child {
    border: none;
  }

  &:hover {
    background-color: var(--greyLight-1);
  }

  & .SubTitle {
    color: var(--greyDark);
    font-size: 1rem;
  }
`;
