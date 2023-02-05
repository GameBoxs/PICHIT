import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import useAxios from "../../../../action/hooks/useAxios";
import { MdAddCircle } from "react-icons/md";

const QuestionInsert = (props) => {
  const { userinfo, pdfhandler, token } = props;
  const [ click, setClick ] = useState(false);

  const [question, setQuestion] = useState({
    content: "",
    interviewJoinId: 0,
    writerId: 0,
  });

  const [postData] = useAxios("questions", "POST", token, question, click);

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
    setClick(true);
  };

  return (
    <QuestionInputBox>
      <form>
        <Input
          name="content"
          value={question.content}
          onChange={inputHandler}
          placeholder={"질문을 입력하세요"}
        ></Input>
        <Button onClick={QuestionHandler}>
          <MdAddCircle />
        </Button>
      </form>

      {/* <form onSubmit={onSubmit}>
      <input 
      type='text'
      placeholder="질문을 입력 해주세요"
      value={value}
      onChange={onChange} ></input>
       <button type="submit">작성</button>    
    </form> */}
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
  box-shadow: inset .2rem .2rem .5rem var(--greyLight-2), inset -.2rem -.2rem .5rem var(--white);
  background: none;
  font-family: inherit;
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
  color: var(--primary);
  cursor: pointer;

  &:hover {
    color: var(--primary-dark);
  }

  *{
    font-size: 2rem;
  }
`;

const QuestionInputBox = styled.div`
  width: 100%;
  padding-bottom: 1rem;

  form {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;
