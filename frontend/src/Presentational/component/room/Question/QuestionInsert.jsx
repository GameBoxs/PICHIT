import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxios from "../../../../action/hooks/useAxios";

const QuestionInsert = ({ userinfo, pdfhandler }) => {
  const token = useSelector((state) => state.token);
  const [click, setClick] = useState(false);

  const [question, setQuestion] = useState({
    content: "",
    interviewJoinId: 0,
    writerId: 0,
  });

  const [postData] = useCallback(
    useAxios("questions", "POST", token, question, click),[]
  );

  useEffect(()=>{
    setQuestion({
      content: "",
      interviewJoinId: pdfhandler.interviewJoinId,
      writerId: userinfo.id,
    })
  }, [userinfo, pdfhandler])
  
  useEffect(() => {
    if (postData && postData.data) {
      setClick(false);
      console.log(postData);
    }
  }, [postData]);

  const inputHandler = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };

  const QuestionHandler = (e) => {
    e.preventDefault();
    setClick(true);
    console.log(question);
  };

  return (
    <>
      <form>
        <Input
          name="content"
          value={question.content}
          onChange={inputHandler}
        ></Input>
        <Button onClick={QuestionHandler}>작성</Button>
      </form>

      {/* <form onSubmit={onSubmit}>
      <input 
      type='text'
      placeholder="질문을 입력 해주세요"
      value={value}
      onChange={onChange} ></input>
       <button type="submit">작성</button>    
    </form> */}
    </>
  );
};
export default QuestionInsert;

const Input = styled.input.attrs({ type: "text" })``;
const Button = styled.button.attrs({ type: "submit" })``;
