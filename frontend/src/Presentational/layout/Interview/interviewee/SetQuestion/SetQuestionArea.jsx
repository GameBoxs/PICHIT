import React, { memo, useState, useEffect } from "react";
import AllQuestionsCompo from "./AllQuestionsCompo";
import SelfIntroducer from "./SelfIntroducer";
import { BodyCompo } from "../StyledCompo";
import ChatCompo from "./ChatCompo";

function SetQuestionArea(props) {
  const { questionData, setReqBody, session, info, reqBody } = props;
  const [chatOn, setChatOn] = useState(false); //사용자가 채팅 기능을 활성화 했는지 여부

  //전체 멤버 중 면접자와 면접관의 정보를 분리하여 저장
  const [members, setMembers] = useState({
    interviewee: {},
    interviewers: [],
  });

  useEffect(() => {
    //publisher 정보를 가져오면
    if (info.publisher !== undefined) {
      //멤버 정보를 임시로 저장할 배열
      let MemberList = [];

      //사용자의 아이지, 이름, 방 참여 시 아이디를 가져욤
      let myID = JSON.parse(info.publisher.stream.connection.data).clientId;
      let myNickName = JSON.parse(
        info.publisher.stream.connection.data
      ).clientData;
      let myInterviewJoinId = JSON.parse(
        info.publisher.stream.connection.data
      ).clientRoomJoinId;

      //해당 사용자의 정보를 임시 배열에 저장
      MemberList.push({
        id: myID,
        name: myNickName,
        interviewJoinId: myInterviewJoinId,
      });

      //MemberList에 구독자들(사용자를 제외한 참가자들)의 id, nickname, interviewjoinId 저장
      for (let i = 0; i < info.subscribers.length; i++) {
        let targetID = JSON.parse(
          info.subscribers[i].stream.connection.data
        ).clientId;

        let targetNickName = JSON.parse(
          info.subscribers[i].stream.connection.data
        ).clientData;

        let targetInterviewJoinId = JSON.parse(
          info.subscribers[i].stream.connection.data
        ).clientRoomJoinId;

        MemberList.push({
          id: targetID,
          name: targetNickName,
          interviewJoinId: targetInterviewJoinId,
        });
      }

      //면접관들 리스트
      const Members = MemberList.filter((person) => {
        //해당 구독자가 면접자일 경우 members state 중 interviewee에 저장
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

      //다른 멤버들은 자동으로 면접자로 분류, 저장
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
        info={info}
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
