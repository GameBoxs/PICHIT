import styled from "styled-components";

const QuestionItem = ({ Question }) => {
  const { content, writer } = Question;

  return (
    <Item>
      <Content>{content}</Content>
      <Name>{writer.name}</Name>
    </Item>
  );
};

export default QuestionItem;

const Content = styled.div``;

const Name = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 0.5rem;
  font-family: SBagrroL;
  color: var(--greyDark);
`;

const Item = styled.div`
  padding: 1rem 0.5rem 2rem 0.5rem;
  min-height: 5rem;
  position: relative;
  border-bottom: var(--greyLight-3) solid 1px;
`;
