import { useEffect } from "react";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useAxios from "../../../../action/hooks/useAxios";

const QuestionItem = ({ Question, setGetUser }) => {
  const { content, writer, permission, id } = Question;
  const token = useSelector(state => state.token)
  const [delQuestion, setDelQuestion] = useState(false);

  const [delRes] = useAxios(
    `questions/${id}`,
    "DELETE",
    token,
    {},
    delQuestion
  )

  useEffect(()=>{
    if (delRes !== null && delRes.success) {
      setGetUser(true)
    }
  }, [delRes])

  return (
    <Item>
      {permission ? (
        <CloseBtn onClick={()=>{setDelQuestion(true)}}>
          <AiFillCloseCircle />
        </CloseBtn>
      ) : null}

      <Content>{content}</Content>
      <Name>{writer.name}</Name>
    </Item>
  );
};

export default QuestionItem;

const CloseBtn = styled.div`
  position: absolute;
  right: 0.5rem;

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
`;

const Name = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 0.5rem;
  font-family: SBagrroL;
  color: var(--greyDark);
`;

const Item = styled.div`
  padding: 1rem 0.5rem 2rem 0.5rem;
  width: inherit;
  min-height: 5rem;
  position: relative;
  border-bottom: var(--greyLight-3) solid 1px;
`;
