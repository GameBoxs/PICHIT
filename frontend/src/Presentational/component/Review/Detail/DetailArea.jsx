import styled from "styled-components";
import React, { memo, useEffect, useState, useRef } from "react";
import useAxios from "../../../../action/hooks/useAxios";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

import { PITCHIT_URL } from "../../../../store/values";
import SubTitle from "../../../common/SubTitle";
import FeedBackArea from "./FeedBack/FeedBackArea";
import SoundArea from "./SoundArea";
import PageBar from "../../../common/Pagination/PageBar";
import Loading from "../../../common/Loading";

const DetailArea = ({ selectedID }) => {
  const token = useSelector((state) => state.token);
  const audioRef = useRef();
  const moveRef = useRef();

  const [data, setData] = useState();
  const [nowPage, setNowPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [sound, setSound] = useState({
    url: "",
    timestamp: {},
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const [getData, isLoadingData] = useAxios(
    `interviewjoins/${selectedID}/questions-with-feedbacks?size=2000`,
    "GET",
    token,
    null,
    selectedID ? true : false
  );

  const [getSound, isLoadingSound] = useAxios(
    `interviewjoins/${selectedID}/recordings`,
    // `interviewjoins/3332/recordings`,
    "GET",
    token,
    null,
    selectedID ? true : false
  );

  useEffect(() => {
    if (getSound && getSound.success && getSound.data) {
      setSound(() => {
        return {
          url: getSound.data.recordingUri,
          timestamp: { ...getSound.data.timestamps },
        };
      });
    }
  }, [getSound]);

  useEffect(() => {
    if (getData && getData.success && getData.data) {
      setData(getData.data.content);
      setTotalPage(getData.data.totalElements);
    }
  }, [getData]);

  useEffect(() => {
    setNowPage(1);
    if (selectedID) {
      moveRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedID]);

  const playTime = (time) => {
    //현재 재생 시간을 selectTime으로 맞춤
    audioRef.current.currentTime = time;
    setIsPlaying(true);
    audioRef.current.play();
  };

  // 자기소개서 조회
  const [resumeData, setResumeData] = useState();

  const width = 600;
  const height = 800;
  const handleOpenPop = () => {
    if (resumeData !== null) {
      setResumeData(null);
    }
    axios({
      method: "get",
      url: `${PITCHIT_URL}/interviewjoins/${selectedID}/resumes`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.data.success === false) {
          setResumeData(res);
        } else {
          setResumeData(res.data.data.uri);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (resumeData && resumeData.data && resumeData.data.success === false) {
      Swal.fire({
        text: "등록된 자소서가 없습니다.",
        showConfirmButton: false,
        icon: "warning",
        timer: 1500,
      });
    } else if (resumeData) {
      window.open(
        resumeData,
        "introducePdf",
        `width=${width}, height=${height}`
      );
    }
  }, [resumeData]);

  return (
    <DetailWrap ref={moveRef}>
      <SubTitle title="면접 피드백" />
      {data !== undefined ? (
        <>
          <Container>
            {selectedID && data ? (
              isLoadingData === true ? (
                <LoadingCompo>
                  <Loading />
                </LoadingCompo>
              ) : (
                <React.Fragment>
                  <Resume>
                    <SubBtn onClick={handleOpenPop}>자소서 조회git </SubBtn>
                  </Resume>
                  <SoundArea
                    sound={sound}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                  />
                  <PageBar
                    setCurrentPage={setNowPage} //현재 페이지를 계산하는 함수
                    currentPage={nowPage} //현재페이지
                    totalpages={totalPage}
                    step="10"
                  />
                  {data[nowPage - 1] && sound.timestamp[nowPage - 1] ? (
                    <FeedBackArea
                      title={data[nowPage - 1].content}
                      data={data[nowPage - 1].feedbacks}
                      timeStamp={sound.timestamp[nowPage - 1]}
                      playTime={playTime}
                    />
                  ) : null}
                </React.Fragment>
              )
            ) : (
              //<FeedBackArea title={currentPost.question} data={currentPost.reviews}/>
              <NullCompo>기록을 선택해주세요</NullCompo>
            )}
          </Container>
        </>
      ) : (
        <NullCompo>기록을 선택해주세요</NullCompo>
      )}
    </DetailWrap>
  );
};

export default memo(DetailArea);

const Container = styled.div`
  min-height: 400px;
  height: fit-content;
  background-color: var(--greyLight-1);
  border-radius: 3rem;
  margin-top: 1rem;
  padding: 2rem 4rem;

  .paginationBar {
    width: 100%;
    height: 3em;
    * {
      height: 0.6em;
      width: 0.6em;
      margin-right: 0.6em;
      background-color: var(--primary-light);
    }
  }
`;

const NullCompo = styled.div`
  width: inherit;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  margin-top: 1rem;
  border-radius: 3rem;
  background-color: var(--greyLight-1);
`;

const DetailWrap = styled.div`
  width: 100%;
  margin-bottom: 50px;

  & > div:first-child {
    font-size: 1.3rem;
    font-family: "SBAggroB";
    color: var(--primary-light);
    padding: 1.4rem 1rem 1rem 1rem;
    border-bottom: solid 2px var(--greyDark);
  }

  & > div:nth-child(4) {
    margin-top: 50px;
  }
`;

const LoadingCompo = styled.div`
  height: 300px;
`;
const SubBtn = styled.div`
  padding: 0.5em 1.2em;
  font-size: 0.8em;
  width: fit-content;
  border-radius: 1rem;
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;
  font-weight: 600;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  background-color: var(--primary);
  box-shadow: inset 0.1rem 0.1rem 0.5rem var(--primary-light),
    inset -0.1rem -0.1rem 0.5rem var(--primary-dark),
    0.15rem 0.15rem 0.3rem var(--greyLight-2),
    -0.1rem -0.1rem 0.25rem var(--white);

  color: var(--greyLight-1);

  &:hover {
    color: var(--white);
  }

  &:active {
    box-shadow: inset 0.2rem 0.2rem 1rem var(--primary-dark),
      inset -0.2rem -0.2rem 1rem var(--primary-light);
  }
`;
const Resume = styled.div`
  display: flex;
  justify-content: flex-end;
`;
