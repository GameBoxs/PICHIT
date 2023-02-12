import React from "react";
import IntervieweeCamCompo from "./IntervieweeCamCompo";
import InterviewerCamCompo from "./InterviewerCamCompo";
import { BodyCompo } from "../StyledCompo";
import { memo } from "react";

const CamArea = ({info}) => {
  return (
    <BodyCompo>
        <IntervieweeCamCompo info={info}/>
        <InterviewerCamCompo info={info}/>
    </BodyCompo>
  );
};

export default memo(CamArea);

