import styled from "styled-components";
import React, { useState } from "react";

const QuestionInsert = ({onInsert}) => {

  const [value, setValue] = useState("");

  const onChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onInsert(value);
    setValue("");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
          <Input
            value={value}
            onChange={onChange}
          ></Input>
          <Button>작성</Button>
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


const Input = styled.input.attrs({type:"text"})``;
const Button = styled.button.attrs({type:"submit"})``;
