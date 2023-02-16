import React, { useState, useEffect, memo } from "react";
import { QuestionBody, SubBtn } from "../StyledCompo";
import SubTitle from "../../../../common/SubTitle";
import axios from "axios";
import { PITCHIT_URL } from "../../../../../store/values";
import { useSelector } from "react-redux";

import Swal from "sweetalert2";

function SelfIntroducer({ members }) {
  const token = useSelector((state) => state.token);
  const [data, setData] = useState();

  //Popup 크기 결정
  const width = 600;
  const height = 800;

  //클릭할 시 자소서 팝업 뜨도록
  const handleOpenPop = () => {

    //면접자가 지정되지 않았거나 interviewJoinId 값을 찾지 못할 때 == 등록된 자소서가 없다고 판단
    if (
      members.interviewee === {} ||
      members.interviewee.interviewJoinId === undefined
    ) {
      Swal.fire({
        text: "등록된 자소서가 없습니다.",
        showConfirmButton: false,
        icon: "warning",
        timer: 1500,
      });
    } else {
      //해당 면접자의 자소서 pdf 가져오기
      axios({
        method: "get",
        url: `${PITCHIT_URL}/interviewjoins/${members.interviewee.interviewJoinId}/resumes`,
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          setData(res.data.data.uri);
        })
        .catch((err) => console.log(err));
    }
  };


  //데이터가 있을 때(받아온 자소서가 있을 때) 팝업 뜨도록 설정
  useEffect(() => {
    if (data !== null && data !== undefined) {
      window.open(data, "introducePdf", `width=${width}, height=${height}`);
    }
    setData(null);
  }, [data]);

  return (
    <QuestionBody>
      <SubTitle title={members.interviewee.name} />
      <SubBtn onClick={handleOpenPop}>자소서 보기</SubBtn>
    </QuestionBody>
  );
}

export default memo(SelfIntroducer);
