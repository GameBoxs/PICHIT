import styled from "styled-components";
import { useState, useRef, memo } from "react";
import Soundbar from "../../Soundbar";
import Sampling from "../../../../store/asset/HypeBoy.mp3";
import ControlPanel from "../../ControlPanel";

const SoundArea = ({sound}) => {
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
    // e.currentTarget.load()
    if (duration !== 0) {
      const currentTime = e.currentTarget.currentTime; //현재 재생되고 있는 위치 반환
      // const duration = audioRef.duration; //현재 오디오바의 전체 길이를 초단위로 반환
      //전체 길이 중 현재 시간이 얼만큼 차지하고 있는 지 백분율로 보여줌
      const percent = ((currentTime / duration) * 100).toFixed(2);
  
      console.log(duration)
  
      setPercentage(+percent);
      //toFixed:지정된 소수 자릿수로 반올림
      setCurrectTime(currentTime.toFixed(2));
    }
  };
  //#endregion

  //#region 로딩 완료시 실행할 이벤트
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

console.log(duration)

  return (
    <SoundWrap>
      {/* 보이는 사운드 바 */}
      <Soundbar
        onChange={onChange}
        percentage={percentage}
        duration={duration}
        timeline={Object.values(sound?.timestamp)}
      />
      
      {/* 시간표시/재생 on off 버튼 */}
      <ControlPanel
        play={play}
        isPlaying={isPlaying}
        duration={duration}
        currentTime={currentTime}
      />

      {/* 소리 재생하게 해주는 태그 */}
      <audio
        ref={audioRef}
        src={sound.url}
        onLoadedData={loadedData}
        onTimeUpdate={getCurrentDuration}
        preload="metadata"
      ></audio>

      {/* {timeline.map((el, idx) => {
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
      })} */}

      {/* <SoundPagenationArea>
                <span>&lt; 1 2 3 4 ... 10 &gt;</span>
            </SoundPagenationArea> */}
    </SoundWrap>
  );
};

const SoundWrap = styled.div`
  width: 100%;
  margin-block: 2rem;
  border-radius: 2rem;
  padding: 2rem;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2),
    -0.2rem -0.2rem 0.5rem var(--white);
  cursor: pointer;
  transition: 0.3s ease;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  background-color: var(--greyLight-1);
`;

const SoundPagenationArea = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 50px;
  span {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
`;

export default memo(SoundArea);
