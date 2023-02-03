import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxios from "../../../../action/hooks/useAxios";

const QuestionInsert = ({ userinfo }) => {
  const token = useSelector((state) => state.token);

  const [content, setContent] = useState("");
  const [click, setClick] = useState(false);
  const [postData] = useAxios(
    "questions",
    "POST",
    token,
    {
      content: content,
      interviewJoinId: userinfo.interviewJoinId,
      writerId: userinfo.id,
    },
    click
  );

  useEffect(() => {
    if (postData && postData.data) {
      setClick(false);
      console.log(postData);
    }
    console.log("useEffect 실행됨?");
  }, [postData]);

  const inputHandler = (e) => {
    setContent(e.target.value);
  };

  const QuestionHandler = (e) => {
    e.preventDefault();
    setClick(true);
    console.log(content);
  };

  return (
    <>
      <form>
        <Input value={content} onChange={inputHandler}></Input>
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
