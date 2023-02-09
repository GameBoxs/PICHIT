import styled from "styled-components";
import { useState, useEffect } from "react";
import { PITCHIT_URL } from "../../../../../store/values";
import axios from "axios";


function ResumeUpload({pdfhandler,token}) {

    // pdf 업로드 용인듯 ( 이것도 필요없을지도 )
    const [uploadPdf, setUploadPdf] = useState(false);
    // pdf 파일 목록 가져옴 (내 자소서 보기 버튼 활성화) 필요없을지두
    const [pdfFileList, setPdfFileList] = useState([]);

    // 파일 업로드 했을 때 새로고침 하는 용도의 useEffect
    useEffect(() => {
      if (uploadPdf === true) {
        window.location.reload();
      }
    }, [uploadPdf]);


  const getUrl = (file) => {
    console.log(file);
    const frm = new FormData();
    frm.append("file", file);
    axios({
      method: "post",
      url: `${PITCHIT_URL}/interviewjoins/${pdfhandler.interviewJoinId}/resumes`,
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
      data: frm,
    })
      .then((res) => {
        console.log(res);
        setUploadPdf(true)

      })
      .catch((err) => console.log(err));
  };

  // pdf 업로드용 함수
  const onPdfFileUpload = (e) => {
    const selectedList = Array.from(e.target.files);
    const getAddList = selectedList.map((item) => item);
    getUrl(getAddList[0]);
    setPdfFileList(selectedList);
  };



  return (
    <div>
      <FileListBody>
        파일이 존재하지 않습니다.
        <FileResultRow>
        <Label htmlFor="uploadFile">파일 업로드하기</Label>
        <Input
          id="uploadFile"
          accept="application/pdf"
          multiple={true}
          onChange={onPdfFileUpload}
        />
        </FileResultRow>
      </FileListBody>
    </div>
  );
}

export default ResumeUpload;

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