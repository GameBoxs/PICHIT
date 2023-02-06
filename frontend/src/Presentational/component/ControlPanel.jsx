import React, { memo } from "react";
import styled from "styled-components";
import SoundBtn from "./SoundBtn";

const ControlPanel = ({ play, isPlaying, duration, currentTime }) => {
  //시간 설정 함수
  const secondsToHms = (seconds) => {
    if (!seconds) return "00m 00s";

    let duration = seconds;

    //시간 계산
    let hours = duration / 3600;
    duration = duration % 3600;

    //분 계산
    let min = parseInt(duration / 60);
    duration = duration % 60;

    //초 계산
    let sec = parseInt(duration);

    if (sec < 10) {
      sec = `0${sec}`;
    }

    if (min < 10) {
      min = `0${min}`;
    }

    if (parseInt(hours, 10) > 0) {
      return `${parseInt(hours, 10)}h ${min}m ${sec}s`;
    } else if (min == 0) {
      return `00m ${sec}s`;
    } else {
      return `${min}m ${sec}s`;
    }
  };

  return (
    <ControlPanelDiv>
      <Timer>{secondsToHms(currentTime)}</Timer>
      <div>
        <SoundBtn play={play} isPlaying={isPlaying} />
      </div>
      <Timer>{secondsToHms(duration)}</Timer>
    </ControlPanelDiv>
  );
};

export default memo(ControlPanel);

const Timer = styled.div``;

const ControlPanelDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  height: 8rem;
`;
