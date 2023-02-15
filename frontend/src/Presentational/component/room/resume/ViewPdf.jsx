import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import styled from "styled-components";
import axios from "axios";
import { PITCHIT_URL } from "../../../../store/values";
import { useSelector } from "react-redux";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useEffect } from "react";


const ViewPDF = ({ pdfhandler }) => {
  const [numPages, setNumPages] = useState(null); // 총 페이지 수
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지 
  const {token} =useSelector(state=>state)
  const [data,setData] = useState()

  useEffect(()=>{
    axios({
      method:"get",
      url:`${PITCHIT_URL}/interviewjoins/${pdfhandler.interviewJoinId}/resumes`,
      headers:{
        Authorization: token,
      }
    }).then((res) => {
      setData(res.data.data.uri)
  
    })
    .catch((err) => 
      console.log(err))
  },[])

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <Layout>
      <Document file={{
      url:data
    }} onLoadSuccess={onDocumentLoadSuccess}>
        <Page wr pageNumber={pageNumber} />
      </Document>
      <PageNext>
        <Next onClick={()=> pageNumber > 1 ? setPageNumber(pageNumber-1):null}>◀</Next>
        <NowPage> {pageNumber} of {numPages} </NowPage>
        <Next onClick={()=> pageNumber < numPages ? setPageNumber(pageNumber+1):null}>▶</Next>
      </PageNext>
    </Layout>
  );
};

export default ViewPDF;

const Layout = styled.div`
  width: 100%;

  * {
    border-radius: 1rem;
    width: 100%;
  }

  & div div div {
    &:nth-child(2) {
      display: none;
    }
    &:nth-child(3) {
      display: none;
    }
  }

  canvas {
    width: inherit !important;
    height: auto !important;
  }
`;

const PageNext = styled.p`
  display: inline-flex;
  align-items: center
  
`
const NowPage = styled.span`
  display: flex;
  justify-content: center;
  background: var(--primary);
  color: white;
  padding:5px;
`

const Next = styled.button`
  margin: 5px;
  text-align: center;
  width: 45px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--primary);
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  &:hover{
    background-color: white;
    color: var(--primary)
  }

`
