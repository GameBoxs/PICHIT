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

  const [res,isLoading,error] = useAxios(
    'conference/interview/question/propose',
    "POST",
    token,
    {
      interviewRoomId : roomID,
      intervieweeId : intervieweeID,
      questionId : id,
      questionContent : content
    },
    execute
  )

  useEffect(()=> {
    if(execute){
      if(error){
        console.log(error.response.data);
        MySwal.fire({
          text: "다른 면접관의 질문이 진행 중 입니다.",
          showConfirmButton: false,
          icon: "error",
          timer: 1500,
        });
      } else {
        MySwal.fire({
          text: "질문이 제출 되었습니다. 질문을 시작해 주세요",
          showConfirmButton: false,
          icon: "success",
          timer: 1500,
        });
      }
      setExecute(false);
    } 
  },[execute])

  
  const QuestionHandler = () => {
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
    <QuestionBody onClick={QuestionHandler} isFinished = {finished}>
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
  background-color:${props => props.isFinished ? `var(--greyLight-1)` : null};
  cursor: ${props => props.isFinished ? null : 'pointer'};

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
    background-color: ${props => props.isFinished ? `var(--greyLight-2)` : `var(--greyLight-1)`};
  }

  & .SubTitle {
    color: var(--greyDark);
    font-size: 1rem;
  }
`;
