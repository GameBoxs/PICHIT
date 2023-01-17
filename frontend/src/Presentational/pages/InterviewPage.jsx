import React from "react";
import { Routes, Route } from "react-router-dom";

import IntervieweePage from "./IntervieweePage";
import InterviewerPage from "./InterviewerPage";
import SelectIntervieweePage from "./SelectIntervieweePage";
import PrepareInterview from "./PrepareInterview";

const InterviewPage = () => {
  return (
      <Routes>
        <Route path="/" element={<PrepareInterview />} />
        <Route path="/interviewee" element={<IntervieweePage />} />
        <Route path="/interviewer" element={<InterviewerPage />} />
        <Route path="/selectinterviewee" element={<SelectIntervieweePage />} />
      </Routes>
  );
};

export default InterviewPage;
