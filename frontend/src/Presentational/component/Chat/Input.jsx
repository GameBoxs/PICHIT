import styled from "styled-components";
import { memo, useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";

const Input = ({ SetIncomMessage, session, info }) => {
  const [textValue, SetTextValue] = useState("");
  const [inputFlag, setInputFlag] = useState(false);
  let flag = false;
  useEffect(() => {
    if (textValue === "\n") SetTextValue("");
    if(textValue && inputFlag===false){
      setInputFlag(true);
    }
    else if(textValue=='' && inputFlag===true){
      setInputFlag(false);
    }
  }, [textValue]);

  useEffect(() => {
    // 타이핑 할때, flag가 true일때 신호 보내기.
    if(inputFlag === true){
      session.signal({
        data: textValue,
        to: [],
        type: "who-typing",
      });
    }
  },[inputFlag])

  function setText(e) {
    SetTextValue(e.target.value);
  }

  function getTime() {
    let today = new Date();

    let hours = ("0" + today.getHours()).slice(-2);
    let minutes = ("0" + today.getMinutes()).slice(-2);
    let seconds = ("0" + today.getSeconds()).slice(-2);

    return hours + ":" + minutes + ":" + seconds;
  }

  function pressEnter(e) {
    if (e.key === "Enter") {
      SetTextValue(textValue.trim());
      if (e.shiftKey || textValue === "") {
        return;
      }
      SetTextValue("");
      clickBtn();
    }
  }

  function clickBtn() {
    SetTextValue(textValue.trim());
    if (textValue === "" || textValue.trim() === "") {
      return;
    }
    let time = getTime();
    const data = { Name: JSON.parse(info.publisher.stream.connection.data).clientData.toString(), Time: time, Message: textValue };
    // SetIncomMessage(data);
    session.signal({
      data: JSON.stringify(data),
      to: [],
      type: "all-chat",
    });
    SetTextValue("");
    setInputFlag(false);
  }

  return (
    <InputWrap>
      <InputText
        placeholder="Type a Message ...."
        value={textValue}
        onChange={setText}
        onKeyDown={pressEnter}
      />
      <SendBtn onClick={clickBtn}>
        <BiSend className="SendImg" />
      </SendBtn>
    </InputWrap>
  );
};

// const InputText = styled.input.attrs({type:"text"})`
//     border: none;
//     font-size: 20px;
//     width: 95%;
//     &:focus{
//         outline: 0;
//     }
// `

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const InputText = styled.textarea.attrs({ rows: 1 })`
  /* border: none;
    /* line-height: 50px; */
  /* &:focus{
        outline: 0;
    } */
  /* resize: none;  */

  width: 90%;
  border: none;
  border-radius: 1rem;
  padding: 1rem 1.4rem;
  box-shadow: inset 0.2rem 0.2rem 0.5rem var(--greyLight-2),
    inset -0.2rem -0.2rem 0.5rem var(--white);
  background: none;
  font-family: inherit;
  color: var(--greyDark);
  resize: none;

  &::placeholder {
    color: var(--greyLight-3);
  }
  &:focus {
    outline: none;
    box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2),
      -0.2rem -0.2rem 0.5rem var(--white);
  }
`;

const SendBtn = styled.div`
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  margin-left: 1rem;

  & * {
    width: inherit;
    height: inherit;
    color: var(--greyDark);

    &:hover {
        color: var(--primary);
    }
  }
`;

export default memo(Input);
