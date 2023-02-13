import React from "react";
import { memo } from "react";
import { QuestionBody, SubBtn } from "../StyledCompo";
import SubTitle from "../../../../common/SubTitle";
import axios from "axios";
import { PITCHIT_URL } from "../../../../../store/values";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

import Swal from "sweetalert2";


function SelfIntroducer({members}) {

  const token =useSelector((state)=>state.token)
  const [data, setData] =useState()

  const width = 600;
  const height =800;
  const handleOpenPop = () => {
   if(members.interviewee === {} || members.interviewee.interviewJoinId === undefined){
      Swal.fire({
        text: "등록된 자소서가 없습니다.",
        showConfirmButton: false,
        icon: "warning",
        timer: 1500,
      });
    }
    else{
      axios({
        method:"get",
        url:`${PITCHIT_URL}/interviewjoins/${members.interviewee.interviewJoinId}/resumes`,
        headers:{
          Authorization: token,
        }
      }).then((res) => {
        setData(res.data.data.uri)
    
      })
      .catch((err) => 
        console.log(err))

       
    }
    
  }
  useEffect(()=>{
    if(data!==null&& data!==undefined){
      window.open(data,"introducePdf",`width=${width}, height=${height}`)
    }
    setData(null)
  },[data])


    return <QuestionBody>
          <SubTitle title={members.interviewee.name} />
          <SubBtn onClick={handleOpenPop}>자소서 보기</SubBtn>
        </QuestionBody>
}

export default memo(SelfIntroducer)