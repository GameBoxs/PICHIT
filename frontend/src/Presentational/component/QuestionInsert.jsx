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
      {/* <BackGround>
        <InsertForm onSubmit={onSubmit}>
          <Input
            placeholder="질문을 입력 해주세요"
            value={value}
            onChange={onChange}
          ></Input>
          <Button type="submit" />
        </InsertForm>
      </BackGround> */}
    <form onSubmit={onSubmit}>
      <input 
      type='text'
      placeholder="질문을 입력 해주세요"
      value={value}
      onChange={onChange} ></input>
       <button type="submit">작성</button>    
    </form>
    </>
  );
};
export default QuestionInsert;

const BackGround = styled.div``;
const InsertForm = styled.form``;
const Input = styled.input``;
const Button = styled.button;
