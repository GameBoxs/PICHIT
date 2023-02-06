import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import styled from "styled-components";

const ViewPDF = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <Layout>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <PageNext>
        <Next onClick={()=> pageNumber > 1 ? setPageNumber(pageNumber-1):null}>
        &lt;
        </Next>
        <Next>Page {pageNumber} of {numPages}</Next>
        <Next onClick={()=> pageNumber < numPages ? setPageNumber(pageNumber+1):null}>
        &gt;
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
