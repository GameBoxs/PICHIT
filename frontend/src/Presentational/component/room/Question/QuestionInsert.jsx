import styled from "styled-components";
import React, { useEffect, useState } from "react";
import useAxios from "../../../../action/hooks/useAxios";
import { MdAddCircle } from "react-icons/md";
import { useRef } from "react";

//질문 입력하는 파트
const QuestionInsert = (props) => {
  const insertRef = useRef();

  const { userinfo, pdfhandler, token, commentHandler } = props;
  // useAxios 실행 조건 click = true 일 때 실행 됨
  const [click, setClick] = useState(false);
  // 질문 입력을 위한 body 값
  const [question, setQuestion] = useState({
    content: "",
    interviewJoinId: 0,
    writerId: 0,
  });

  //POST로 질문 내용 전송하는 부분
  const [postData] = useAxios("questions", "POST", token, question, click);

  //postData body 설정
  useEffect(() => {
    setQuestion({
      content: "",
      interviewJoinId: pdfhandler.interviewJoinId,
      writerId: userinfo.id,
    });
  }, [props]);

  useEffect(() => {
    if (postData !== null && postData.success) {
      setClick(false);

      //insert 안에 내용 없애기
      insertRef.current.value = "";

      //post body 설정
      setQuestion({
        ...question,
        content: "",
      });

      //새로 질문 등록한 후 다시 질문 목록 받아오게 하는 함수
      commentHandler((prev) => {
        return {
          ...prev,
          get: true,
        };
      });
    }
  }, [postData]);

  // content 입력값 감지
  const inputHandler = (e) => {
    setQuestion({
      ...question,
      content: e.target.value,
    });
  };

  // 질문 작성 handler 작성 버튼 클릭시 click=true로 활성화 됨
  const QuestionHandler = (e) => {
    e.preventDefault();
    if(question.content.trim()===''){
      alert('질문을 입력해주세요')
    }
    else{
      setClick(true);
    }
  };

  return (
    <QuestionInputBox>
      <form>
        <Input
          name="content"
          value={question.content}
          onChange={inputHandler}
          placeholder={"질문을 입력하세요"}
          ref={insertRef}
        ></Input>
        <Button onClick={QuestionHandler}>
          <MdAddCircle />
        </Button>
      </form>
    </QuestionInputBox>
  );
};
export default QuestionInsert;

const Input = styled.input.attrs({ type: "text" })`
  width: 100%;
  height: 5vh;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  padding-left: 1.4rem;
  box-shadow: inset 0.2rem 0.2rem 0.5rem var(--greyLight-2),
    inset -0.2rem -0.2rem 0.5rem var(--white);
  background: none;
  color: var(--greyDark);

  &::placeholder {
    color: var(--greyLight-3);
  }
  &:focus {
    outline: none;
    box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2),
      -0.2rem -0.2rem 0.5rem var(--white);
  }
`;

const Button = styled.button.attrs({ type: "submit" })`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    color: var(--primary-dark);
  }

  * {
    font-size: 2rem;
  }

  path {
    color: var(--primary);
  }
`;

const QuestionInputBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 3;

  form {
    width: inherit;
    display: grid;
    grid-template-columns: 15fr 2fr;
    grid-gap: 0.5rem;
  }
`;
