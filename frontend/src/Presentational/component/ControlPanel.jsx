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
      return `${parseInt(hours, 10)}:${min}:${sec}`;
    } else if (min == 0) {
      return `00:${sec}`;
    } else {
      return `${min}:${sec}`;
    }
  };

  return (
    <ControlPanelDiv>
      <Timers>
        <Timer>{secondsToHms(currentTime)}</Timer>
        <Timer>{secondsToHms(duration)}</Timer>
      </Timers>
      <Player>
        <SoundBtn play={play} isPlaying={isPlaying} />
      </Player>
    </ControlPanelDiv>
  );
};

export default memo(ControlPanel);

const Player = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Timer = styled.div`
  font-family: "SBAggroM";
  color: var(--greyDark);
`;

const Timers = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ControlPanelDiv = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
`;
