import styled from "styled-components";
import { memo, useEffect, useState, useRef } from "react";
import useAxios from "../../../../action/hooks/useAxios";
import { useSelector } from "react-redux";

import SubTitle from "../../../common/SubTitle";
import FeedBackArea from "./FeedBack/FeedBackArea";
import SoundArea from "./SoundArea";
import PageBar from "../../../common/Pagination/PageBar";

const DetailArea = ({ selectedID }) => {
  const token = useSelector((state) => state.token);
  const audioRef = useRef();

  
  const [data, setData] = useState();
  const [nowPage, setNowPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [sound, setSound] = useState({
    url: "",
    timestamp: {},
  });
  const [isPlaying, setIsPlaying] = useState(false);
  console.log('데이타가 왜 없는데 ', data);
  
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
  }, [selectedID]);

  const playTime = (time) => {
    //현재 재생 시간을 selectTime으로 맞춤
    audioRef.current.currentTime = time;

    setIsPlaying(true);
    audioRef.current.play();
  };

  return (
    <DetailWrap>
      {data !== undefined ? (
        <>
          <SubTitle title="면접 피드백" />
          <Container>
            {selectedID && data ? (
              isLoadingData === true ? (
                <div>loading...</div>
              ) : (
                <>
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
                  />
                  {
                    data[nowPage-1] ?
                    <FeedBackArea
                      title={data[nowPage - 1].content}
                      data={data[nowPage - 1].feedbacks}
                      timeStamp={sound.timestamp[nowPage - 1]}
                      playTime={playTime}
                    />
                    : null
                  }
                </>
              )
            ) : (
              //<FeedBackArea title={currentPost.question} data={currentPost.reviews}/>
              <NullCompo>기록을 선택해주세요</NullCompo>
            )}
          </Container>
        </>
      ) : null}
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
    height: 1em;

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
`;

const DetailWrap = styled.div`
  width: 100%;
  margin-bottom: 50px;

  & > div:first-child {
    font-size: 1.3rem;
    font-family: "SBAggroB";
    color: var(--primary-light);
    padding: 1.4rem 1rem 1rem 1rem;
    /* border-bottom: solid 2px var(--greyDark); */
  }

  & > div:nth-child(4) {
    margin-top: 50px;
  }
`;
