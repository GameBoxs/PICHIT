import React, {useState, useEffect} from "react";
import { BodyCompo } from "../StyledCompo";

import AboutQuestion from "./AboutQuestion";
import AboutFeedBack from "./AboutFeedBack";
import AboutRating from "./AboutRating";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import useAxios from "../../../../../action/hooks/useAxios";

const MySwal = withReactContent(Swal)

const QuestionArea = (props) => {
  const { setIsQuestion, session, roomStateData, token, info } = props;
  const roomInfo = JSON.parse(sessionStorage.getItem("roomInfo"));

  const [highlight, setHighlight] = useState({
    questionId: '',
    questionContent: '질문을 선택해 주세요',
  });
  const [feedback, setFeedback] = useState({
    starScore: 0, //별점
    feedbackContext: "",
  });
  const [finishExecute, setfinishExecute] = useState(false);
  const [sendFeedbackExecute, setSendFeedbackExecute] = useState(false);

  // 질문 종료 서버에 알리기위한 Axios
  const [requestQuestEnd, requestQuestEndIsLoading, requestQuestEndError] = useAxios(
    "conference/interview/question/end",
    "POST",
    token,
    {
      interviewRoomId: roomInfo.roomId,
      intervieweeId: info.interviewee,
      questionId: highlight.questionId,
      score: feedback.starScore,
      content: feedback.feedBackContext,
    },
    finishExecute
  );

  // 패드백 전송 Axios
  const [sendFeedBackData, sendFeedBackIsLoading, sendFeedBackError] = useAxios(
    "feedbacks",
    "POST",
    token,
    {
      questionId: highlight.questionId,
      score: feedback.starScore,
      content: feedback.feedbackContext,
    },
    sendFeedbackExecute
  );
  
  useEffect(() => {
    if (finishExecute) {
      setfinishExecute(false);
    }
    if(sendFeedbackExecute) {
      // 아래에 평가 별 0으로 초기화 하는 내용 넣어야 함.
      setFeedback((prev) => {
        return {
          starScore: 0,
          feedbackContext: "",
        };
      });

      setHighlight({
        questionId: "",
        questionContent: "질문을 제출해 주세요.",
      });

      MySwal.fire({
        text: "질문이 끝났습니다. 다음 질문을 선택해 주세요.",
        showConfirmButton: false,
        icon: "warning",
        timer: 1500,
      });

      setSendFeedbackExecute(false);
    }
  }, [finishExecute,sendFeedbackExecute]);

  useEffect(() => {
    if(session !== null){
      session.on("broadcast-question-start", (data) => {
        setHighlight(JSON.parse(data.data));
        setIsQuestion(true);
      });
      session.on("broadcast-question-end", (data) => {
        setIsQuestion(true);
        setSendFeedbackExecute(true);
      });
    }
  }, [session]);

  useEffect(() => {
    if(roomStateData && roomStateData.data){
      if(roomStateData.data.questionProceeding){
        const data = roomStateData.data.questionProceeding;
        setHighlight({
          questionId: data.questionId,
          questionContent: data.content,
        })
      }
    }
  },[roomStateData])


  // 질문 끝내기 버튼 클릭시 발생할 함수.
  const finishHandler = () => {
    if (highlight.questionId) {
      MySwal.fire({
        title: "질문 종료",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "취소",
        showConfirmButton: true,
        confirmButtonText: "확인",
        html: (
          <div>
            <p>작성중인 피드백이 전부 서버로 전송됩니다.</p>
            <p>질문을 종료하기 전 다른 면접관들이 피드백 작성이 끝났나요?</p>
            <p>전부 작성이 끝났는것을 확인하셨다면 확인을 눌러주세요.</p>
          </div>
        ),
      }).then((result) => {
        if (result.isConfirmed) {
          setfinishExecute(true);
        }
      });
    }
  };

  return (
    <BodyCompo>
      {/* 질문 */}
      <AboutQuestion highlight={highlight} finishHandler={finishHandler} />

      {/* 평가 */}
      <AboutRating starScore={feedback.starScore} setFeedback={setFeedback} />

      {/* 피드백 */}
      <AboutFeedBack
        feedback={feedback.feedbackContext}
        setFeedback={setFeedback}
      />
    </BodyCompo>
  );
};

export default QuestionArea;
