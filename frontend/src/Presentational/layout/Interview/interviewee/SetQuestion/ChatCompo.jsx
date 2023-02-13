import React from "react";
import { QuestionBody } from "../StyledCompo";
import SubTitle from "../../../../common/SubTitle";
import ChatArea from "../../../Chat/ChatArea";

function ChatCompo(props) {
  const { session, chatOn, setChatOn, info } = props;

  //채팅 활성화/비활성화
  const chatHandler = () => {
    setChatOn(!chatOn);
  };

  return (
    <QuestionBody>
      <div onClick={chatHandler} className="ChatTitle">
        채팅
      </div>
      {/* <SubTitle title={"채팅"} /> */}
      <ChatArea session={session} info={info} chatOn={chatOn} />
    </QuestionBody>
  );
}

export default ChatCompo;
