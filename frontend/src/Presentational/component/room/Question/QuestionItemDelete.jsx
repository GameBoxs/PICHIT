import styled from "styled-components";
import useAxios from "../../../../action/hooks/useAxios";
import { useState, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function QuestionItemDelete({ token, id }) {
  const [delQuestion, setDelQuestion] = useState(false);
  const [delRes, delLoading, delError] = useAxios(
    `questions/${id}`,
    "DELETE",
    token,
    {},
    delQuestion
  );

  console.log("delRes",delRes)

  useEffect(() => {
    if (delRes && delRes.success) {
      console.log("삭제됨?");
      setDelQuestion(false);
      console.log(delQuestion)
    }
    if (delError) {
      setDelQuestion(false);
    }
  }, [delRes]);

  return (
    <Buttons
      title="삭제하기"
      onClick={() => {
        setDelQuestion(true);
      }}
    >
      <AiFillCloseCircle />
    </Buttons>
  );
}
export default QuestionItemDelete;

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
