import React from "react";
import { memo } from "react";
import { QuestionBody, SubBtn } from "../StyledCompo";
import SubTitle from "../../../../common/SubTitle";

function SelfIntroducer({members}) {
    return <QuestionBody>
          <SubTitle title={members.interviewee.name} />
          <SubBtn>자소서 보기</SubBtn>
        </QuestionBody>
}

export default memo(SelfIntroducer)