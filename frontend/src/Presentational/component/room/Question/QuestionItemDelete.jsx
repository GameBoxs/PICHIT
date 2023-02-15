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
    null,
    delQuestion
  );

    // 삭제 성공 후 새로고침하기 위해서 
  useEffect(() => {
    if (delRes && delRes.success) {
      window.location.reload();
  
    }
    // 무한 렌더링 방지용 
    if (delError) {
      setDelQuestion(false);
    }
  }, [delRes]);
  

  // DELETE 활성화 후 바로 false 처리 해주기 위해서
  useEffect(() => {
    setDelQuestion(false)
  },[delQuestion])

  return (
    <Buttons
      title="삭제하기"
      onClick={() => {
        setDelQuestion(true);
        console.log("click")
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
