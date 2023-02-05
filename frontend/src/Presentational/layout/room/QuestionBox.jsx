import styled from "styled-components";
import QuestionList from "../../component/room/Question/QuestionList";
import QuestionInsert from "../../component/room/Question/QuestionInsert";
import React, { useState } from "react";
import useAxios from "../../../action/hooks/useAxios";
import { useSelector } from "react-redux";
import PageBar from "../../common/Pagination/PageBar";
import { useEffect } from "react";

const QuestionBox = ({ idx, userinfo, pdfhandler }) => {
  const token = useSelector((state) => state.token);

  const [Questions, setQuestions] = useState([]);
  const [questObj, setQuestObj] = useState({
    page: 10,
    size: 10,
    sort: [],
  });
  const [getUser, setGetUser] = useState(false)

  const [getQuestion] = useAxios(
    `interviewjoins/${pdfhandler.interviewJoinId}/questions`,
    "GET",
    token,
    questObj,
    getUser
  );

  useEffect(()=>{
    if (pdfhandler !== undefined) {
      setGetUser(true)
    }
  }, [pdfhandler])

  useEffect(()=>{
    if (getQuestion !== null && getQuestion.success) {
      console.log(getQuestion?.data)
      setQuestions([...getQuestion?.data.content])
    }
  }, [getQuestion])

  return (
    <Question>
      <QuestionList idx={idx} Questions={Questions} />
      <Controler>
        <QuestionInsert
          userinfo={userinfo}
          pdfhandler={pdfhandler}
          token={token}
        />
        <PageBar
          totalPosts={15} //전체 데이터 길이
          postsPerPage={5} //페이지당 게시물 수
          setCurrentPage={1} //현재 페이지를 계산하는 함수
          currentPage={1} //현재페이지
          totalpages={5} //페이지 길이
        />
      </Controler>
    </Question>
  );
};

export default QuestionBox;

const Controler = styled.div`
  position: absolute;
  bottom: 5%;
  left: 5%;
  width: 90%;
`;

const Question = styled.div`
  position: relative;
  min-height: 500px;
  height: 60%;
  padding: 5%;
  width: 100%;
  background-color: var(--greyLight-1);
  border-radius: 1rem;

  .paginationBar {
    button {
      width: 0.8rem;
      height: 0.8rem;
      margin-right: 3%;
    }
  }
`;
