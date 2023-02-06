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
  const [nowPage, setNowPage] = useState(1);
  const [getUser, setGetUser] = useState(false);
  const [allQuestion, setAllQuestion] = useState(1);

  const [getQuestion] = useAxios(
    `interviewjoins/${pdfhandler.interviewJoinId}/questions?page=${nowPage-1}&size=10`,
    "GET",
    token,
    {},
    getUser
  );

  useEffect(() => {
    if (pdfhandler !== undefined) {
      setGetUser(true);
      setNowPage(1);
    }
  }, [pdfhandler]);

  useEffect(()=> {
    setGetUser(true)
  }, [nowPage])

  useEffect(() => {
    if (getQuestion !== null && getQuestion.success) {
      setQuestions([...getQuestion?.data.content]);
      setAllQuestion(Math.floor(getQuestion?.data.totalElements / 10)+1);
      
      setGetUser(false);
    }
  }, [getQuestion]);

  // QuestionList: 해당 참가자에게 달려있는 질문 list 목록
  // QuestionInsert: 질문 입력 칸

  return (
    <Question>
      <QuestionBoxTitle>
        <div>질문</div>
        <div>{allQuestion}</div>
      </QuestionBoxTitle>
      <QuestionList idx={idx} Questions={Questions} setGetUser={setGetUser} />
      <Controler>
        <QuestionInsert
          userinfo={userinfo}
          pdfhandler={pdfhandler}
          token={token}
          commentHandler={setGetUser}
        />
        <PageBar
          totalpages={allQuestion} //전체 데이터 길이
          setCurrentPage={setNowPage} //현재 페이지를 계산하는 함수
          currentPage={nowPage} //현재페이지
        />
      </Controler>
    </Question>
  );
};

export default QuestionBox;

const QuestionBoxTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  font-family: SBagrroL;
  color: var(--greyDark);
  width: 100%;
`;

const Controler = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 1fr;
  align-items: center;
  justify-content: center;
`;

const Question = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 16fr 4fr;
  height: 600px;
  padding: 5%;
  width: 100%;
  background-color: var(--greyLight-1);
  border-radius: 1rem;

  .paginationBar {
    width: 90%;
    margin-inline: 5%;

    button {
      width: 0.8rem;
      height: 0.8rem;
      margin-right: 3%;
    }
  }
`;
