import styled from "styled-components";
import React from "react";
import { useState, useEffect } from "react";
import { PITCHIT_URL } from "../../../../../store/values";
import axios from "axios";

function MemberList({
  participants,
  setPdfHandler,
  setShowPdf,
  token,
  pdfhandler,
  setMemData,
  memData,
  inquire,
  setInquire
}) {
    
  // 자기소개서를 등록하지 않아서 에러발생시 사용 할 데이터
  const [errorContext, setError] = useState(null);
  
  // 자기소개서 axios
  useEffect(() => {
    if (inquire) {
      axios({
        method: "GET",
        url: `${PITCHIT_URL}/interviewjoins/${pdfhandler.interviewJoinId}/resumes`,
        headers: {
          Authorization: token,
        },
        data: null,
      })
        .then((res) => {
            setMemData(res.data);
            console.log("MemberList")
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setMemData(null);
        })
    }
    return(()=>{
      setInquire(false);
      setMemData(null)
    })

  }, [pdfhandler]);

  
  useEffect(() => {
    setInquire(false);
  }, [errorContext]);


  // pdf 이름에 따른 함수
  const getPdfOwner = (elem) => {
    setPdfHandler({ ...elem });
    setShowPdf(false);
    setInquire(true);
  };

  // 면접방 참여자
  const interviewees = participants.map((elem, idx) => {
    return (
      <React.Fragment key={idx}>
        <input
          type="radio"
          name={`radio`}
          id={`tab-${idx + 1}`}
          onClick={() => getPdfOwner(elem)}
        />
        <label htmlFor={`tab-${idx + 1}`}>
          <p>{elem.name}</p>
        </label>
      </React.Fragment>
    );
  });

  return (
    <>
      <Member>
        {interviewees}
        <MemberColor></MemberColor>
      </Member>
    </>
  );
}
export default MemberList;

const MemberColor = styled.div``;

const Member = styled.div`
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  width: 20.4rem;
  margin-bottom: 1rem;
  border-radius: 1rem !important;
  display: flex;
  align-items: center;
  position: relative;

  & input {
    display: none;
  }

  & > input:checked + label {
    transition: all 0.5s ease;
    color: var(--primary);
  }

  & label {
    width: 5rem;
    height: 2rem;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--greyDark);
    transition: all 0.5s ease;

    &:hover {
      color: var(--primary);
    }
  }

  ${MemberColor} {
    position: absolute;
    height: 2rem;
    width: 5rem;
    border-radius: 0.8rem !important;
    box-shadow: inset 0.2rem 0.2rem 0.5rem var(--greyLight-2),
      inset -0.2rem -0.2rem 0.5rem var(--white);
    pointer-events: none;
  }

  #tab-1:checked ~ ${MemberColor} {
    transform: translateX(0);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  #tab-2:checked ~ ${MemberColor} {
    transform: translateX(5rem);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  #tab-3:checked ~ ${MemberColor} {
    transform: translateX(10rem);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;
