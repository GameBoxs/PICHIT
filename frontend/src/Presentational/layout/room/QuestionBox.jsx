import styled from "styled-components";
import QuestionList from "../../component/room/Question/QuestionList";
import QuestionInsert from "../../component/room/Question/QuestionInsert";
import React, { memo, useState } from "react";
import useAxios from "../../../action/hooks/useAxios";
import { useSelector } from "react-redux";
import PageBar from "../../common/Pagination/PageBar";
import { useEffect } from "react";

const QuestionBox = ({ idx, userinfo, pdfhandler, sessionOpened }) => {
  const token = useSelector((state) => state.token);
  const [aboutQuestions, setAboutQuestions] = useState({
    questions: [],
    allQuestion: 1,
    length: 0,
    get: false,
  });
  const [nowPage, setNowPage] = useState(1);
  
  const [getQuestion] = useAxios(
    `interviewjoins/${pdfhandler.interviewJoinId}/questions?size=10&page=${
      nowPage - 1
    }`,
    "GET",
    token,
    {},
    aboutQuestions.get
  );
  console.log(getQuestion)
    console.log(aboutQuestions.get)
  useEffect(() => {
    if (pdfhandler !== undefined) {
      setNowPage(1);
      setAboutQuestions((prev) => {
        return {
          ...prev,
          get: true,
        };
      });
    }
  }, [pdfhandler]);

  useEffect(() => {
    if (getQuestion !== null && getQuestion.success) {
      setAboutQuestions(() => {
        return {
          questions: [...getQuestion?.data.content],
          allQuestion: Math.floor(getQuestion?.data.totalElements / 10) + 1,
          length: getQuestion?.data.totalElements,
          get: false,
        };
      });
    }
  }, [getQuestion]);
  useEffect(()=>{
    // setNowPage(1);
    setAboutQuestions((prev) => {
      return {
        ...prev,
        get: true,
      };
    });
  },[nowPage])
  
  return (
    <Question>
      <QuestionBoxTitle>
        <div>질문</div>
        <div>{aboutQuestions.length}</div>
      </QuestionBoxTitle>
      {/* QuestionList: 해당 참가자에게 달려있는 질문 list 목록 */}
      <QuestionList
        idx={idx}
        Questions={aboutQuestions.questions}
        userinfo={userinfo}
        pdfhandler={pdfhandler}
      />
      <Controler>
        {/* QuestionInsert: 질문 입력 칸 */}
        {!sessionOpened ? (
          <QuestionInsert
            userinfo={userinfo}
            pdfhandler={pdfhandler}
            token={token}
            commentHandler={setAboutQuestions}
          />
        ) : (
          <div className="guidance">질문을 입력할 수 없습니다</div>
        )}
        <PageBar
          totalpages={aboutQuestions.allQuestion} //전체 데이터 길이
          setCurrentPage={setNowPage} //현재 페이지를 계산하는 함수
          currentPage={nowPage} //현재페이지
          step='10'
        />
      </Controler>
    </Question>
  );
};

export default memo(QuestionBox);

const QuestionBoxTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  font-family: "SBAggroL";
  width: 100%;

  * {
    color: var(--greyDark);
  }
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
