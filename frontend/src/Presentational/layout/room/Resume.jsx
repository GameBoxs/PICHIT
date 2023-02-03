import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ViewPdf from "../../component/room/resume/ViewPdf";
import * as pdfjs from "pdfjs-dist";

import { IoClose } from "react-icons/io5";

import useAxios from "../../../action/hooks/useAxios";

// 근데 import * as 안하면 에러남 필수로 해줄 것!

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Resume({ idx }) {
  const [pdfFileList, setPdfFileList] = useState([]);
  const [pdfUrl, setPdfUrl] = useState();
  const [showPdf, setShowPdf] = useState(false);

  const getUrl = (file) => {
    const blob = new Blob([file]);
    const pdfUrl = URL.createObjectURL(blob);
    setPdfUrl(pdfUrl);
    console.log(pdfUrl);
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
  };

  const onPdfClose = (e) => {
    setShowPdf(false);
  };

  return (
    <MainContainer>
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
            {pdfFileList.length === 0 ? (
              <FileListBody>
                파일이 존재하지 않습니다
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
        )}
      </FileContainer>
    </MainContainer>
  );
}

export default Resume;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
`;

const FileContainer = styled.div`
  display: flex;
  justify-content: center;
  width: inherit;
  height: 100%;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
  height: 100%;
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
  height: 200px;
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
  height: 80%;
  height: 200px;
  border-radius: 1rem;
  background-color: var(--greyLight-1);

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
  padding-left: 10px;
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
