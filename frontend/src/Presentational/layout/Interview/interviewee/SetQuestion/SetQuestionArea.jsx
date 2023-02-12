import React, { memo, useState } from "react";
import AllQuestionsCompo from "./AllQuestionsCompo";
import SelfIntroducer from "./SelfIntroducer";
import { BodyCompo } from "../StyledCompo";
import ChatCompo from "./ChatCompo";
import { useEffect } from "react";

function SetQuestionArea(props) {
  const { questionData, setReqBody, session, info, reqBody } = props;
  const [chatOn, setChatOn] = useState(false);

  const [members, setMembers] = useState({
    interviewee: {},
    interviewers: [],
  });

  useEffect(() => {
    if(info.publisher !== undefined){
      let MemberList = [];
  
      let myID = JSON.parse(info.publisher.stream.connection.data).clientId;
      let myNickName = JSON.parse(
        info.publisher.stream.connection.data
      ).clientData;
  
      MemberList.push({ id: myID, name: myNickName });
  
      for (let i = 0; i < info.subscribers.length; i++) {
        let targetID = JSON.parse(
          info.subscribers[i].stream.connection.data
        ).clientId;
  
        let targetNickName = JSON.parse(
          info.subscribers[i].stream.connection.data
        ).clientData;
  
        MemberList.push({ id: targetID, name: targetNickName });
      }
  
      //면접관들 리스트
      const Members = MemberList.filter((person) => {
        if (person.id == info.interviewee) {
          setMembers((prev) => {
            return {
              ...prev,
              interviewee: { ...person },
            };
          });
        }
        return person.id != info.interviewee;
      });
  
      setMembers((prev) => {
        return {
          ...prev,
          interviewers: [...Members],
        };
      });
    }
  }, [props]);

  return (
    <BodyCompo chatOn={chatOn}>
      {/* 자소서 보기 버튼 */}
      <SelfIntroducer members={members} />

      {/* 총 질문 모아보기 */}
      <AllQuestionsCompo
        chatOn={chatOn}
        members={members}
        reqBody={reqBody}
        setReqBody={setReqBody}
        questionData={questionData}
        info = {info}
      />

      {/* 채팅 */}
      <ChatCompo
        session={session}
        chatOn={chatOn}
        setChatOn={setChatOn}
        info={info}
      />
    </BodyCompo>
  );
}

export default memo(SetQuestionArea);
