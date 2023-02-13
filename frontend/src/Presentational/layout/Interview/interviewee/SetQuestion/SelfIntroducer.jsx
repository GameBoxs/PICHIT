import React from "react";
import { memo } from "react";
import { QuestionBody, SubBtn } from "../StyledCompo";
import SubTitle from "../../../../common/SubTitle";
import axios from "axios";
import { PITCHIT_URL } from "../../../../../store/values";
import { useSelector } from "react-redux";
import { useState } from "react";

function SelfIntroducer({members}) {

  const token =useSelector((state)=>state.token)
  const [data, setData] =useState()

  const interviewee = members.interviewee
  console.log(members.interviewee)

  const handleOpenPop = () => {
    // axios({
    //   method:"get",
    //   url:`${PITCHIT_URL}/interviewjoins/${pdfhandler.interviewJoinId}/resumes`,
    //   headers:{
    //     Authorization: token,
    //   }
    // }).then((res) => {
    //   setData(res.data.data.uri)
    //   console.log(data)
  
    // })
    // .catch((err) => 
    //   console.log(err))
  

    // const popup = window.open()  
  }
    return <QuestionBody>
          <SubTitle title={members.interviewee.name} />
          <SubBtn onClick={handleOpenPop}>자소서 보기</SubBtn>
        </QuestionBody>
}

export default memo(SelfIntroducer)