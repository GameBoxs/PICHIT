import styled from "styled-components";
import { useState, memo } from "react";
import Soundbar from "../../Soundbar";
import ControlPanel from "../../ControlPanel";

const SoundArea = ({sound, audioRef, isPlaying, setIsPlaying}) => {
  const [percentage, setPercentage] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrectTime] = useState(0);

  //오디오 Bar 클릭시 해당 위치에서 음악 재생
  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;

    setPercentage(e.target.value);
  };

  //오디오 재생함수
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

  //진행 시간, 퍼센트 구하는 함수
  const getCurrentDuration = (e) => {
    if (duration !== 0) {
      //현재 재생되고 있는 위치 반환
      const currentTime = e.currentTarget.currentTime; 

      //전체 길이 중 현재 시간이 얼만큼 차지하고 있는 지 백분율로 보여줌
      const percent = ((currentTime / duration) * 100).toFixed(2);
  
      console.log(duration)
  
      setPercentage(+percent);

      //toFixed:지정된 소수 자릿수로 반올림
      setCurrectTime(currentTime.toFixed(2));
    }
  };
  

  //로딩 완료시 실행할 이벤트
  const loadedData = (e) => {
    //toFixed:지정된 소수 자릿수로 반올림
    setDuration(e.currentTarget.duration.toFixed(2));
  };
  

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

export default memo(SoundArea);
