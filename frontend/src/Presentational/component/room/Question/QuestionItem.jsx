import styled from "styled-components";

const QuestionItem = ({ Question }) => {
  const { id, name, text } = Question;

  return (
    <Item>
      {Question.name}:{Question.text}
    </Item>
  );
};

export default QuestionItem;

const Item = styled.div``;
