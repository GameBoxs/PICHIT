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
    page: 0,
    size: 10,
    sort: [],
  });
  const [getUser, setGetUser] = useState(false)
  const [allQuestion, setAllQuestion] = useState(0);

  const [getQuestion] = useAxios(
    `interviewjoins/${pdfhandler.interviewJoinId}/questions?page=${questObj.page}&size=${questObj.size}&sort=${questObj.sort}`,
    "GET",
    token,
    {},
    getUser
  );

  useEffect(()=>{
    if (pdfhandler !== undefined) {
      setGetUser(true)
    }
  }, [pdfhandler])

  useEffect(()=>{
    if (getQuestion !== null && getQuestion.success) {
      setQuestions([...getQuestion?.data.content])
      setGetUser(false)

      setAllQuestion(getQuestion?.data.totalElements)
    }
  }, [getQuestion])

  return (
    <Question> 
      <QuestionBoxTitle>
        <div>질문</div>
        <div>{allQuestion}</div>
      </QuestionBoxTitle>
      <QuestionList idx={idx} Questions={Questions} />
      <Controler>
        <QuestionInsert
          userinfo={userinfo}
          pdfhandler={pdfhandler}
          token={token}
          commentHandler={setGetUser}
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

const QuestionBoxTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  font-family: SBagrroL;
  color: var(--greyDark);
`;


const Controler = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 2fr 1fr;
  align-items: center;
`;

const Question = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 1fr 16fr 4fr;
  height: 600px;
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
