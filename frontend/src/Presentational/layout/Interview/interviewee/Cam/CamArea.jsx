import React from "react";
import IntervieweeCamCompo from "./IntervieweeCamCompo";
import InterviewerCamCompo from "./InterviewerCamCompo";
import { BodyCompo } from "../StyledCompo";
import { memo } from "react";

// 캠 화면
const CamArea = ({ info }) => {
  return (
    <BodyCompo>
      {/* 면접관 캠 화면 */}
      <IntervieweeCamCompo info={info} />
      {/* 면접자 캠 화면 */}
      <InterviewerCamCompo info={info} />
    </BodyCompo>
  );
};

export default memo(CamArea);
