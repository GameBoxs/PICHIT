/* ETC Import */
import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";
import useAxios from "../../../../action/hooks/useAxios";

/* Component Import */
import CamArea from "./Cam/CamArea";
import QuestionArea from "./Question/QuestionArea";
import SetQuestionArea from "./SetQuestion/SetQuestionArea";

const BodyArea = (props) => {
  const { info, roomInfo, token, session, roomStateData } = props;

  const [reqBody, setReqBody] = useState({
    //요청 보낼 때 쓰는 값들
    writerId: 0,
    intervieweeId: 0,
    interviewRoomId: 0,
  });

  const [isQuestion, setIsQuestion] = useState(false); //useAxios에서 excute로 쓰이는 애들
  const [questionData, setQuestionData] = useState([]); //질문 목록들

  const [getQuest] = useAxios(
    `questions?writerId=${reqBody.writerId}&intervieweeId=${reqBody.intervieweeId}&interviewRoomId=${reqBody.interviewRoomId}`,
    "GET",
    token,
    {},
    isQuestion
  );

  useEffect(() => {
    if(info.publisher !== undefined){
      let roomID = JSON.parse(info.publisher.stream.connection.data).clientRoomId;
  
      setReqBody(() => {
        return {
          writerId: roomInfo.userInfo.id,
          intervieweeId: info.interviewee,
          interviewRoomId: roomID,
        };
      });
    }
  }, [props]);

  useEffect(() => {
    //질문자를 선택할 때마다 getQuest가 실행되도록 하기
    if (
      reqBody.writerId !== 0 &&
      reqBody.interviewRoomId !== 0 &&
      reqBody.intervieweeId !== 0
    ) {
      setIsQuestion(true);
    }
  }, [reqBody]);

  useEffect(() => {
    //질문 목록을 가져오는데 성공하면 QuestionData에 값을 저장
    if (getQuest !== null && getQuest.success) {
      setIsQuestion(false);
      setQuestionData(getQuest.data);
    }
  }, [getQuest]);

  return (
    <InterviewBody>
      {/* 화상채팅 부분 */}
      <CamArea info={info} />

      {/* 질문/피드백 박스 */}
      <QuestionArea
        setIsQuestion={setIsQuestion}
        session={session}
        roomStateData={roomStateData}
        token = {token}
        info = {info}
      />

      {/* 자소서보기/채팅/ */}
      <SetQuestionArea
        roomStateData={roomStateData}
        questionData={questionData}
        reqBody={reqBody}
        setReqBody={setReqBody}
        session={session}
        info={info}
      />
    </InterviewBody>
  );
};

export default memo(BodyArea);

const InterviewBody = styled.div`
  background-color: var(--greyLight-1);
  height: 90vh;
  margin: 0vh 3vw 4vh 3vw;
  border-radius: 3vw;
  gap: 0.5vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  box-shadow: 0.8rem 0.8rem 1.4rem var(--greyLight-2),
    -0.2rem -0.2rem 1.8rem var(--greyLight-2);
  align-items: center;
  overflow: hidden;

  * {
    border-radius: 3vw;
  }
`;
