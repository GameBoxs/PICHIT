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
    </Layout>

  );
};

export default ViewPDF;

const Layout = styled.div`
   & div div div{
    &:nth-child(2){
      display: none;
    }
    &:nth-child(3){
      display: none;
    }
   }
  

`