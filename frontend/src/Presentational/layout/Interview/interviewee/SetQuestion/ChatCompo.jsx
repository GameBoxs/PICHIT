import React from "react";
import styled from "styled-components";
import { QuestionBody } from "../StyledCompo";
import { BiChevronDown } from "react-icons/bi";
import ChatArea from "../../../Chat/ChatArea";

function ChatCompo(props) {
  const { session, chatOn, setChatOn, info } = props;

  //채팅 활성화/비활성화
  const chatHandler = () => {
    setChatOn(!chatOn);
  };

  return (
    <QuestionBody>
      <ChatTitle onClick={chatHandler} className="ChatTitle">
        <SubDiv>채팅</SubDiv>
        <SubDiv chatOn={chatOn}>
          <BiChevronDown />
        </SubDiv>
      </ChatTitle>
      {/* <SubTitle title={"채팅"} /> */}
      <ChatArea session={session} info={info} chatOn={chatOn} />
    </QuestionBody>
  );
}

export default ChatCompo;

const SubDiv = styled.div`
  color: var(--greyLight-3);

  transform: ${props => props.chatOn ? "rotate(180deg)" : "rotate(0deg)"};
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  path {
    color: var(--primary);
  }
`;

const ChatTitle = styled.div`
  padding-top: 2vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
