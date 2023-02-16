import { useEffect, useState, useRef, memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useAxios from "../../../../action/hooks/useAxios";

import { FaPenNib, FaRedoAlt } from "react-icons/fa";

import QuestionItemDelete from "./QuestionItemDelete";

//질문 항목
const QuestionItem = ({ Question, pdfhandler, userinfo }) => {
  const { content, writer, permission, id } = Question;

  const insertRef = useRef();
  const token = useSelector((state) => state.token);
  
  //질문 수정 관련 state
  const [retouchQuestion, setRetouchQuestion] = useState(false);
  const [tryRetouch, setTryRetouch] = useState(false);
  // 질문 입력을 위한 body 값
  const [question, setQuestion] = useState({
    content: "",
    interviewJoinId: 0,
    writerId: 0,
  });

  //질문 수정할 시 axios
  const [putData, putLoading, putError] = useAxios(
    `questions/${id}`,
    "PUT",
    token,
    question,
    retouchQuestion
  );

  //post body 설정
  useEffect(() => {
    setQuestion({
      content: "",
      interviewJoinId: pdfhandler.interviewJoinId,
      writerId: userinfo.id,
    });
  }, [pdfhandler]);

  useEffect(() => {
    if (putData !== null && putData.success) {
      //새로 질문 등록할 때
      //화면 새로고침 함
      setRetouchQuestion(false)
      window.location.reload();
    }
    if (putError) {
      //질문이 등록되지 않았을 때
      setRetouchQuestion(false)
    }
  }, [putData]);

  //수정 시도할 때
  const setRetouch = () => {
    setTryRetouch(!tryRetouch);
  };

  //질문 수정된 내용 입력받고 수정
  const inputHandler = (e) => {
    setQuestion({
      ...question,
      content: e.target.value,
    });
  };

  //완료되면 POST 할 수 있도록
  const putHandler = (e) => {
    e.preventDefault();
    setRetouchQuestion(true);
  };

  return (
    <Item>
      {permission ? (
       <QuestionItemDelete id={id} token={token} />
      ) : null}

      <Content>
        {content}

        {/* 수정하려고 할 때 하단에 input 생성 */}
        {tryRetouch ? (
          <QuestionInputBox>
            <form>
              <Input
                name="content"
                placeholder={content}
                onChange={inputHandler}
                ref={insertRef}
              ></Input>
              <RetouchButton onClick={putHandler}>
                <FaPenNib />
              </RetouchButton>
            </form>
          </QuestionInputBox>
        ) : null}
      </Content>

      <Name>
        {permission ? (
          <Buttons title="수정하기" onClick={setRetouch}>
            {tryRetouch ? <FaRedoAlt /> : <FaPenNib />}
          </Buttons>
        ) : null}
        {writer.name}
      </Name>
    </Item>
  );
};

export default memo(QuestionItem);

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

const RetouchButton = styled.button.attrs({ type: "submit" })`
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

  * {
    font-size: 1.3rem;
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

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  cursor: pointer;

  * {
    font-size: 1.2rem;
    color: var(--primary);

    &:hover {
      color: var(--primary-dark);
    }
  }
`;

const Content = styled.div`
  padding-block: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Name = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 0.5rem;
  font-family: 'SBAggroL';
  color: var(--greyDark);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 2;
`;

const Item = styled.div`
  padding: 1rem 0.5rem 2rem 0.5rem;
  width: inherit;
  min-height: 5rem;
  position: relative;
  border-bottom: var(--greyLight-3) solid 1px;
`;
