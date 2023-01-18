//#region import
import React, { useEffect } from "react";
import Soundbar from "../component/Soundbar";
import Sampling from "../../store/asset/HypeBoy.mp3";
import { useRef, useState } from "react";
import ControlPanel from "../component/ControlPanel";
import styled from "styled-components";
import Title from "../common/Title";
import SubTitle from "../common/SubTitle";

import {ToggleButton} from "../common/ToggleButton";

const ReviewPage = (props) => {
  //#region Hook

  //#region useState Hook
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrectTime] = useState(0);
  //#endregion

  //#region useRef Hook
  const audioRef = useRef();
  //#endregion

  //#endregion

  //#region 타이틀 텍스트 변수
  // 피드백 타이틀 텍스트
  const titleText = (
    <div>
      안녕하세요 <br /> 김지훈님
    </div>
  );

  // 피드백 서브타이틀 텍스트
  const subtitleText = (
    <div
      style={{ fontSize: "25px", marginTop: "50px", fontWeight: "bold" }}
    >
      기록 선택하기
    </div>
  );
  //#endregion

  //#region 오디오 Bar 클릭시 해당 위치에서 음악 재생
  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;

    setPercentage(e.target.value);
  };
  //#endregion

  //#region 오디오 재생함수
  const play = () => {
    const audio = audioRef.current;
    audio.volume = 0.1;

    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    } else {
      setIsPlaying(false);
      audio.pause();
    }
  };
  //#endregion
  
  //#region 진행 시간, 퍼센트 구하는 함수
  const getCurrentDuration = (e) => {
    const currentTime = e.currentTarget.currentTime; //현재 재생되고 있는 위치 반환
    const duration = e.currentTarget.duration; //현재 오디오바의 전체 길이를 초단위로 반환
    //전체 길이 중 현재 시간이 얼만큼 차지하고 있는 지 백분율로 보여줌
    const percent = ((currentTime / duration) * 100).toFixed(2);

    setPercentage(+percent);
    //toFixed:지정된 소수 자릿수로 반올림
    setCurrectTime(currentTime.toFixed(2));
  };
  //#endregion

  //#region 로깅 완료시 실행할 이벤트
  const loadedData = (e) => {
    //toFixed:지정된 소수 자릿수로 반올림
    setDuration(e.currentTarget.duration.toFixed(2));
  };
  //#endregion

  //#region 재생시간구하는 함수
  const playTime = (time) => {
    //받아온 시간을 바탕으로 duration에 맞는 값으로 계산
    const thisTime = time.split(":").map((el) => parseFloat(el));
    let start = 0;

    if (thisTime.length === 2) {
      start = thisTime[0] * 60 + thisTime[1];
    } else {
      start = thisTime[0] * 3600 + thisTime[1] * 60 + thisTime[2];
    }

    //현재 재생 시간을 selectTime으로 맞춤
    audioRef.current.currentTime = start;

    setIsPlaying(true);
    audioRef.current.play();
  };
  //#endregion

  //#region Variable
  const timeline = ["00:18", "1:09", "2:00"];
  //#endregion

  return (
    <ReviewMainBody>
      <Title title={titleText}></Title>
      <SubTitle title={subtitleText}></SubTitle>
      <Line></Line>


      Review
      {/* 보이는 사운드 바 */}

      <Soundbar
        onChange={onChange}
        percentage={percentage}
        duration={duration}
        timeline={timeline}
      />

      {/* 소리 재생하게 해주는 태그 */}
      <audio
        ref={audioRef}
        src={Sampling}
        onLoadedData={loadedData}
        onTimeUpdate={getCurrentDuration}
      ></audio>

      {/* 시간표시/재생 on off 버튼 */}
      <ControlPanel
        play={play}
        isPlaying={isPlaying}
        duration={duration}
        currentTime={currentTime}
      />

      {timeline.map((el, idx) => {
        return (
          <button
            onClick={() => {
              playTime(el);
            }}
            key={idx}
          >
            HIHIHI
          </button>
        );
      })}
    </ReviewMainBody>
  );
};

export default ReviewPage;

const Line = styled.hr`
  margin-top: 10px;
`;

const ReviewMainBody = styled.div`
  margin: 0 4.5em 0 4.5em;
  height: 100%;

  & {
    .SubTitle {
      font-size: "25px";
      margin-top: "50px";
      font-weight: "bold";
    }

    > div:nth-child(1) {
      font-size: 50px;
      font-weight: bolder;
    }
  }
`;
