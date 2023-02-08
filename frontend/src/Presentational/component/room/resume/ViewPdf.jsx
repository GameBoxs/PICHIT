import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import styled from "styled-components";
import axios from "axios";
import { PITCHIT_URL } from "../../../../store/values";
import { useSelector } from "react-redux";


const ViewPDF = ({ fileUrl,pdfhandler }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const {token} =useSelector(state=>state)
  const [data,setData] = useState()

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


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <Layout>
      <Document   file={{
      url:data
    }} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <PageNext>
        <Next onClick={()=> pageNumber > 1 ? setPageNumber(pageNumber-1):null}>
        ◀
        </Next>
        <Next>Page {pageNumber} of {numPages}</Next>
        <Next onClick={()=> pageNumber < numPages ? setPageNumber(pageNumber+1):null}>
        ▶
        </Next>
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
  
`

const Next = styled.span`
  
`
