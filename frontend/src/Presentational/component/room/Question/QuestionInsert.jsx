import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxios from "../../../../action/hooks/useAxios";

const QuestionInsert = (props) => {
  const {userinfo, pdfhandler} = props
  const token = useSelector((state) => state.token);
  // useAxios 실행 조건 click = true 일 때 실행 됨
  const [click, setClick] = useState(false);
 // 질문 입력을 위한 body 값
  const [question, setQuestion] = useState({
    content: "",
    interviewJoinId: 0,
    writerId: 0,
  });
 // 질문 등록 useAxios
  const [postData] = useCallback(
    useAxios("questions", "POST", token, question, click),[]
  );
  //질문 등록 성공시 Axios 데이터 감지해서 click=false로 변경
  useEffect(()=>{
    setQuestion({
      content: "",
      interviewJoinId: pdfhandler.interviewJoinId,
      writerId: userinfo.id,
    })
  }, [props])
  
  useEffect(() => {
    if (postData && postData.data) {
      setClick(false);
      console.log(postData);
    }
  }, [postData]);

  // content 입력값 감지 
  const inputHandler = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };


  // 질문 작성 handler 작성 버튼 클릭시 click=true로 활성화 됨 
  const QuestionHandler = (e) => {
    e.preventDefault();
    setClick(true);
    setQuestion({...question,
    content:""})
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
    </>
  );
};
export default QuestionInsert;

const Input = styled.input.attrs({ type: "text" })``;
const Button = styled.button.attrs({ type: "submit" })``;
