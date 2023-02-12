import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";
import useAxios from "../../../../action/hooks/useAxios";
import CamArea from "./Cam/CamArea";
import QuestionArea from "./Question/QuestionArea";
import SetQuestionArea from "./SetQuestion/SetQuestionArea";

const BodyArea = (props) => {
  const { info, roomInfo, token, session, roomStateData } = props;
  console.log('BodyArea진입 햇는데 데이터는?? ', roomStateData);

  const [reqBody, setReqBody] = useState({
    //요청 보낼 때 쓰는 값들
    writerId: 0,
    intervieweeId: 0,
    interviewRoomId: 0,
  });

  const [isQuestion, setIsQuestion] = useState(false); //useAxios에서 excute로 쓰이는 애들
  const [questionData, setQuestionData] = useState([]); //질문 목록들

  // console.log(roomStateData)


  /*
  

    얘는 뭐하는 친군가요...?o.o 걍 없애도 되길래 놔둡니다...

    const [closeExecute, setCloseExecute] = useState(false);

    useEffect(() => {
      if (closeExecute) setCloseExecute(false);
    }, [closeExecute]);
  

  */

  // 질문 받아오는 Axios
  /*
  
    얘도 컴포넌트 안에 넣고 싶었지만...다른 곳에서 setIsQuestion을 제어한다고 하더라도
    isQuestion 값이 유지된 상태에서 반복해서 렌더링 되는 경우가 있어서 무한 렌더링을 하더라거
    그래서 BodyArea에 놔둡니다

  */
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
    console.log('질문 가져왔음????? ', getQuest);
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
