import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ViewPdf from "../../component/room/resume/ViewPdf";
import * as pdfjs from "pdfjs-dist";

import { IoClose } from "react-icons/io5";

import axios from "axios";
import { useSelector } from "react-redux";
import {PITCHIT_URL} from "../../../store/values"
import { set } from "lodash";


// 근데 import * as 안하면 에러남 필수로 해줄 것!

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Resume({ idx, participants, setPdfHandler, pdfhandler }) {
  const { token, userinfo } = useSelector((state) => state);
  const [pdfFileList, setPdfFileList] = useState([]);
  const [pdfUrl, setPdfUrl] = useState();
  const [showPdf, setShowPdf] = useState(false);
  const [uploadPdf , setUploadPdf] =useState(false);
  const [data, setData] = useState(null)

  // const [PostPdf, isLoading] = useAxios()
  // console.log(participants)
  // console.log("이건 pdfhandler",pdfhandler)
  // console.log("이건 user정보",userinfo)

  // const [postData, isLoading] = useAxios(
  //   `interviewjoins/${pdfhandler.interviewJoinId}/resumes`,
  //   "POST",
  //   token,
  //   pdfUrl,
  //   uploadPdf
  // )
  // console.log(pdfUrl)
  
  // useEffect(()=> {
  //   if (postData && postData.success){
  //     setUploadPdf(false)
  //   }
  // },[postData])
  
  

  const getUrl = (file) => {
    console.log(file)
    const blob = new Blob([file]);
    const pdfUrl = URL.createObjectURL(blob);
    setPdfUrl(pdfUrl);
    console.log(pdfUrl);
    const frm = new FormData()
    frm.append("file",file);
    axios({
      method:"post",
      url:`${PITCHIT_URL}/interviewjoins/${pdfhandler.interviewJoinId}/resumes`,
      headers:{
        "Authorization": token,
        "Content-Type": 'multipart/form-data',
      },
      data:
        frm
    }).then((res) => {
      console.log(res)
    })
    .catch((err) => 
      console.log(err))
  };

  const onPdfFileUpload = (e) => {
    const selectedList = Array.from(e.target.files);
    const getAddList = selectedList.map((item) => item);
    getUrl(getAddList[0]);
    console.log(getAddList[0])
    setPdfFileList(selectedList);
  };
  // 등록된 pdf 삭제 
  const onDeleteTarget = () => {
    setPdfFileList([]);
  };

  const FileResultList = () => {
    return React.createElement(
      React.Fragment,
      null,
      pdfFileList.map((item, index) =>
        React.createElement(
          FileResultBody,
          null,
          React.createElement(
            FileResultRow,
            { key: index },
            React.createElement(
              "div",
              { onClick: onUrlClick, className: "fileName" },
              item.name
            ),
            React.createElement(
              DeleteButton,
              { onClick: onDeleteTarget },
              <IoClose />
            )
          )
        )
      )
    );
  };

  const onUrlClick = (e) => {
    setShowPdf(true);
    axios({
      method:"get",
      url:`${PITCHIT_URL}/interviewjoins/${pdfhandler.interviewJoinId}/resumes`,
      headers:{
        Authorization: token,
      }
    }).then((res) => {
      setData(res.data)
      console.log(res)
    })
    .catch((err) => 
      console.log(err))
    
  };

  const onPdfClose = (e) => {
    setShowPdf(false);
  };

  const getPdfOwner = (elem) => {
    setPdfHandler({...elem})

  }

  const pdfInquire = () =>{
  
    axios({
      method:"get",
      url:`${PITCHIT_URL}/interviewjoins/${pdfhandler.interviewJoinId}/resumes`,
      headers:{
        Authorization: token,
      }
    }).then((res) => {
      setData(res.data.data.uri)
      console.log(data)
    })
    .catch((err) => 
      console.log(err))

      window.open(`${data}`,'_blank')
      
    //   console.log(use.rPdfUrl)
    // return <div><ViewPdf fileUrl={userPdfUrl} /></div>
  }

  const interviewees = participants.map((elem, idx) => {

    return (
      <React.Fragment
      key={idx}
    >
        <input
          type="radio"
          name={`radio`}
          id={`tab-${idx + 1}`}
          onClick={()=>getPdfOwner(elem)}
        />
        <label htmlFor={`tab-${idx + 1}`}
        >
          <p>{elem.name}</p>
        </label>
      </React.Fragment>
    );
  });



  return (
    <MainContainer>
      <Member>
        {interviewees}
        <MemberColor></MemberColor>
      </Member>
      <FileContainer>
        {showPdf ? (
          <ModalOverlay visible={showPdf}>
            <PdfContainer>
              <ButtonContainer>
                <CloseButton onClick={onPdfClose}>
                  <IoClose />
                </CloseButton>
              </ButtonContainer>
              <ViewPdf fileUrl={pdfUrl} />
            </PdfContainer>
          </ModalOverlay>
        ) : (
          <FileList>
            {pdfFileList.length === 0 ? (<>
            {pdfhandler.id === userinfo.id ? (
              <FileListBody>
                파일이 존재하지 않습니다.
                  <Label htmlFor="uploadFile">파일 업로드하기</Label>
                  <Input
                    id="uploadFile"
                    accept="application/pdf"
                    multiple={true}
                    onChange={onPdfFileUpload}
                  />
              </FileListBody>
            ):(<FileListBody><Label 
            onClick={pdfInquire}
            >조회하기</Label></FileListBody>)}
            </>
            ) : (
              <FileResultList />
            )}
          </FileList>
        )}
      </FileContainer>
    </MainContainer>
  );
}

export default Resume;

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

const FileContainer = styled.div`
  display: flex;
  justify-content: center;
  width: inherit;
  height: inherit;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
`;

const FileListTitle = styled.div`
  display: flex;
  align-items: center;
  height: 20%;
  border-bottom: 1px solid black;
  padding-left: 10px;
`;

const FileListBody = styled.div`
  display: flex;
  height: inherit;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 1rem;
  background-color: var(--greyLight-1);
`;

const FileResultBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 550px;
  border-radius: 1rem;
  background-color: var(--greyLight-1);
  padding: 2rem;

  & .sign {
  }

  & .fileName {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1em;
    border: none;
    background-color: var(--primary);
    color: var(--white);
    cursor: pointer;
    padding: 0.5rem 1rem;

    &:hover {
      background-color: var(--primary-dark);
    }
  }
`;

const FileResultRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Input = styled.input.attrs({ type: "file" })`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const Label = styled.label`
  padding: 0.5rem 1rem;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;
  grid-column: 1 / 2;
  grid-row: 4 / 5;
  background-color: var(--primary);
  box-shadow: inset 0.2rem 0.2rem 1rem var(--primary-light),
    inset -0.2rem -0.2rem 1rem var(--primary-dark),
    0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white);
  color: var(--greyLight-1);
  border-radius: 1rem;

  &:hover {
    color: var(--white);
  }

  &:active {
    box-shadow: inset 0.2rem 0.2rem 1rem var(--primary-dark),
      inset -0.2rem -0.2rem 1rem var(--primary-light);
  }
`;

const ModalOverlay = styled.div`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
  border: none;
  background-color: var(--primary-light);
  padding: 0.5em;
  color: var(--white);
  cursor: pointer;

  &:hover {
    background-color: var(--primary-dark);
  }
`;

const PdfContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 1rem;
  background-color: var(--greyLight-2);
  padding: 0.5rem;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  position: absolute;
  top: 1em;
  right: 1em;
  z-index: 3;

  button {
    width: 2.5em;
    height: 2.5em;
    font-size: 1em;
    border: none;
    color: var(--white);
    background-color: var(--primary);
    border-radius: 5em;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      background-color: var(--primary-dark);
    }
  }
`;

const CloseButton = styled.button`
  width: 50px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  min-height: 550px;

  & ${FileListBody} {
    height: 550px;
  }
`;
