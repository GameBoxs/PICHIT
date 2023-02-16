/* ETC Import */
import styled from "styled-components";
import { memo, useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";

const Input = ({session, info }) => {
  /* 
    textValue - 채팅창 입력 값
    inputFlag - 채팅창 입력 중 신호 Flag
  */
  const [textValue, SetTextValue] = useState("");
  const [inputFlag, setInputFlag] = useState(false);

  /* textValue 변경 감지 */
  useEffect(() => {
    /* textValue가 줄바꿈 일 경우 비워주기 */
    if (textValue === "\n") SetTextValue("");
    /* textValue가 null이 아닌 상태에서 inputFlag가 false일 때 */
    if(textValue && inputFlag === false){
      setInputFlag(true);
    }
    /* textValue가 비어있는데 inputFlag가 true일 때 */
    else if(textValue === '' && inputFlag === true){
      setInputFlag(false);
    }
  }, [textValue]);

  /* inputFlag 변경 감지 */
  useEffect(() => {
    /* inputFlag가 true면 입력중 이라는 신호 보내기 */
    if(inputFlag === true){
      session.signal({
        data: textValue,
        to: [],
        type: "who-typing",
      });
    }
  },[inputFlag])

  /* textValue state set */
  function setText(e) {
    SetTextValue(e.target.value);
  }

  /* 현재 시간 값 */
  function getTime() {
    let today = new Date();

    let hours = ("0" + today.getHours()).slice(-2);
    let minutes = ("0" + today.getMinutes()).slice(-2);
    let seconds = ("0" + today.getSeconds()).slice(-2);

    return hours + ":" + minutes + ":" + seconds;
  }

  /* Enter 누를때 실행할 함수 */
  function pressEnter(e) {
    if (e.key === "Enter") {
      /* 좌우 공백 제거한 값으로 textValue state 변경 */
      SetTextValue(textValue.trim());
      /* 좌우 공백 제거한 값이 공백일 때 그냥 return */
      if (e.shiftKey || textValue === "") {
        return;
      }
      SetTextValue("");
      clickBtn();
    }
  }

  /* 메세지 전송 함수 */
  function clickBtn() {
    /* 좌우 공백 제거한 값으로 textValue state 변경 */
    SetTextValue(textValue.trim());
    /* 좌우 공백 제거한 값이 공백일 때 그냥 return */
    if (textValue === "" || textValue.trim() === "") {
      return;
    }

    /* 날짜를 구하고 데이터를 담아 신호 보내기 */
    let time = getTime();
    const data = { Name: JSON.parse(info.publisher.stream.connection.data).clientData.toString(), Time: time, Message: textValue };
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

export default memo(Input);

/* Styled-Component */
const InputWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const InputText = styled.textarea.attrs({ rows: 1})`
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