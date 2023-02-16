import React, { memo, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useAxios from "../../../../action/hooks/useAxios";
import { useSelector } from "react-redux";

import SubTitle from "../../../common/SubTitle";
import FeedBackArea from "./FeedBack/FeedBackArea";
import SoundArea from "./SoundArea";
import PageBar from "../../../common/Pagination/PageBar";
import Loading from "../../../common/Loading";
import { forwardRef } from "react";

//각 면접방 상세 피드백을 보여주는 공간
const DetailArea = ({ selectedID, moveRef }) => {
  const token = useSelector((state) => state.token);

  // 현재 오디오 위치를 지정하는 ref
  const audioRef = useRef();

  //피드백 정보
  const [data, setData] = useState();

  //pagination을 위한 state들
  const [nowPage, setNowPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  //음성 파일과 타임 스탬프
  const [sound, setSound] = useState({
    url: "",
    timestamp: {},
  });

  //현재 재생 중인지, 아닌지 판단하는 항목
  const [isPlaying, setIsPlaying] = useState(false);

  //피드백 관련 데이터 들고오는 useAxios
  const [getData, isLoadingData] = useAxios(
    `interviewjoins/${selectedID}/questions-with-feedbacks?size=2000`,
    "GET",
    token,
    null,
    selectedID ? true : false
  );

  //음성 관련 데이터 받아오는 useAxios
  const [getSound, isLoadingSound] = useAxios(
    `interviewjoins/${selectedID}/recordings`,
    // `interviewjoins/3332/recordings`,
    "GET",
    token,
    null,
    selectedID ? true : false
  );

  //음성 데이터 받아오면 state에 넣음
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

  //피드백 데이터 받아오면 state에 넣음
  useEffect(() => {
    if (getData && getData.success && getData.data) {
      setData(getData.data.content);
      setTotalPage(getData.data.totalElements);
    }
  }, [getData]);

  //원하는 피드백 항목 선택 후
  useEffect(() => {
    //현재 페이지 설정
    setNowPage(1);
  }, [selectedID]);

  //재생 시간 설정 함수
  const playTime = (time) => {
    //현재 재생 시간을 selectTime으로 맞춤
    audioRef.current.currentTime = time;
    //플레이 시작
    setIsPlaying(true);
    audioRef.current.play();
  };

  return (
    <div ref={moveRef}>
      <DetailWrap>
        <SubTitle title="면접 피드백" />

        {/* 데이터 있을 경우 해당 내용 표시 */}
        {data !== undefined ? (
          <>
            <Container>
              {/* 선택된 항목과 데이터가 있을 경우 */}
              {selectedID && data ? (
                // 모든 데이터가 로딩 되었는 지 확인
                isLoadingData === true ? (
                  <LoadingCompo>
                    <Loading />
                  </LoadingCompo>
                ) : (
                  <React.Fragment>
                    {/* 음성 파일 출력 부분 */}
                    <SoundArea
                      sound={sound}
                      audioRef={audioRef}
                      isPlaying={isPlaying}
                      setIsPlaying={setIsPlaying}
                    />

                    {/* 페이지네이션 */}
                    <PageBar
                      setCurrentPage={setNowPage} //현재 페이지를 계산하는 함수
                      currentPage={nowPage} //현재페이지
                      totalpages={totalPage}
                      step="10"
                    />

                    {/* 피드백 보여주는 파트 */}
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
                // 데이터 없는 걸로 판단
                <NullCompo>기록을 선택해주세요</NullCompo>
              )}
            </Container>
          </>
        ) : (
          <NullCompo>기록을 선택해주세요</NullCompo>
        )}
      </DetailWrap>
    </div>
  );
};

export default forwardRef(DetailArea);

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
