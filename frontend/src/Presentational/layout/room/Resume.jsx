import React, { useState,useEffect } from "react";
import styled from "styled-components";
import ViewPdf from "../../component/room/resume/ViewPdf";
import * as pdfjs from "pdfjs-dist"

// 근데 import * as 안하면 에러남 필수로 해줄 것!  

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Resume({idx}) {
  const [pdfFileList, setPdfFileList] = useState([]);
  const [pdfUrl, setPdfUrl] = useState();
  const [showPdf, setShowPdf] = useState(false);

  const getUrl = (file) => {
    const blob = new Blob([file]);
    const pdfUrl = URL.createObjectURL(blob);
    setPdfUrl(pdfUrl);
  };

  const onPdfFileUpload = (e) => {
    const selectedList = Array.from(e.target.files);
    const getAddList = selectedList.map((item) => item);
    getUrl(getAddList[0]);
    setPdfFileList(selectedList);
  };

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
              { onClick: onUrlClick, style: { textDecoration: "darkblue" } },
              item.name
            ),
            React.createElement(DeleteButton, { onClick: onDeleteTarget }, "X")
          )
        )
      )
    );
  };
  const onUrlClick = (e) => {
    setShowPdf(true);
  };
  const onPdfClose = (e) => {
    setShowPdf(false);
  };

  return (
    <MainContainer>
      <FileContainer>
        { showPdf ?
        
        <ModalOverlay visible={showPdf}>
          <PdfContainer>
            <ButtonContainer>
              <CloseButton onClick={onPdfClose}>X</CloseButton>
            </ButtonContainer>
            <ViewPdf fileUrl={pdfUrl} />
          </PdfContainer>
        </ModalOverlay>
       :(
        <FileList>
          <FileListTitle>파일 목록, {idx}</FileListTitle>
          {pdfFileList.length === 0 ? (
            <FileListBody>
              <Label htmlFor="uploadFile">파일 업로드하기</Label>
              <Input
                id="uploadFile"
                accept="application/pdf"
                multiple={true}
                onChange={onPdfFileUpload}
              />
            </FileListBody>
          ) : (
            <FileResultList />
          )}
        </FileList>
       ) }
      </FileContainer>
    </MainContainer>
  );
}

export default Resume;
const MainContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 600px;
`;
const FileContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 200px;
`;
const FileList = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
  border: 1px solid black;
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
  height: 80%;
  align-items: center;
  justify-content: center;
`;

const FileResultBody = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  overflow: scroll;
`;
const FileResultRow = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  justify-content: space-between;
`;
const Input = styled.input.attrs({type:"file"})`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 30px;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 13px;
`;

const ModalOverlay = styled.div`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const DeleteButton = styled.button`
  margin-right: 10px;
`;
const PdfContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;
const CloseButton = styled.button`
  width: 50px;
`;
