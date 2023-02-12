import React, {useState, useEffect} from "react";
import { BodyCompo } from "../StyledCompo";

import AboutQuestion from "./AboutQuestion";
import AboutFeedBack from "./AboutFeedBack";
import AboutRating from "./AboutRating";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal)

const QuestionArea = (props) => {
  const { setIsQuestion, session, roomStateData } = props;
  console.log('Qestion Area 진입 데이터는???? ', roomStateData);

  const [highlight, setHighlight] = useState({
    questionId: '',
    questionContent: '질문을 선택해 주세요',
  });
  const [feedback, setFeedback] = useState({
    starScore: 0, //별점
    feedbackContext: "",
  });
  const [finishExecute, setfinishExecute] = useState(false);
  
  useEffect(() => {
    if (finishExecute) {
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

      setIsQuestion(true);
      setfinishExecute(false);
    }
  }, [finishExecute]);

  useEffect(() => {
    if(session !== null){
      session.on("broadcast-question-start", (data) => {
        console.log("highlight -- ", JSON.parse(data.data));
        setHighlight(JSON.parse(data.data));
        setIsQuestion(true);
      });
      session.on("broadcast-question-end", (data) => {
        // 아래에 피드백 전송 데이터 보내기
        /* 
        
        
              여기 비어있는데 맞나요??
               
  
        */
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
          console.log(feedback);
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
