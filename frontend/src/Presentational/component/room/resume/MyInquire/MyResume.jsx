import styled from "styled-components";
import axios from "axios";
import { PITCHIT_URL } from "../../../../../store/values";
import useAxios from "../../../../../action/hooks/useAxios";
import MyresumeDelete from "./MyresumeDelete";

function MyResume({ setShowPdf, token, pdfhandler, setMemData }) {
  const [getData] = useAxios(
    `interviewjoins/${pdfhandler.interviewJoinId}/resumes`,
    "GET",
    token
  );

  // const FileId =getData.data.id

  // console.log(FileId)
  // 등록된 pdf 데이터 삭제
  if (getData && getData.data !== null) {
    return (
      <>
        <FileResultBody>
          <FileResultRow>
            <div className="fileName" onClick={() => setShowPdf(true)}>
              내 자소서 보기
            </div>
            <MyresumeDelete
              setMemData={setMemData}
              getData={getData}
              token={token}
            />
          </FileResultRow>
        </FileResultBody>
      </>
    );
  }
}
export default MyResume;

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
