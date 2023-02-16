import React from "react";
import { memo } from "react";
import Rating from "../../Rating";
import SubTitle from "../../../../common/SubTitle";
import { QuestionBody } from "../StyledCompo";

// 별을 통해 점수 매기는 컴포넌트
function AboutRating({starScore, setFeedback}) {
  return (
    <QuestionBody>
      <SubTitle title={"평가"} />
      <Rating setFeedback={setFeedback} starScore={starScore} />
    </QuestionBody>
  );
}

export default memo(AboutRating);
