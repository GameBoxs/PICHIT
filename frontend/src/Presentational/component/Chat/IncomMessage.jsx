/* ETC Import */
import styled from "styled-components";

const IncomMessage = ({ data }) => {
  return (
    <IncomWrap>
      <TitleArea>
        <div>{data?.Name}</div>
        <div>{data?.Time}</div>
      </TitleArea>
      <MessageText>{data?.Message}</MessageText>
    </IncomWrap>
  );
};

export default IncomMessage;

/* Styled-Component */
const IncomWrap = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--greyLight-2);
  padding-block: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 1rem;

  * {
    margin: 0;
  }

  & div:first-child {
    font-size: 1rem;
    color: var(--greyDark);
  }

  & div:last-child {
    font-size: 0.8rem;
    color: var(--greyLight-2);
  }
`;

const MessageText = styled.p`
  white-space: normal;
  word-break: break-all;
  width: auto;
`;