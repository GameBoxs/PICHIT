import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../../action/GlobalStyle";

const Soundbar = ({ onChange, percentage, timeline }) => {
  const [position, setPosition] = useState(0);  //Thumb 위치 지정
  const [marginLeft, setMarginLeft] = useState(0);  //Thumb 좌측 margin 설정
  const [progressBarWidth, setProgressBarWidth] = useState(0);  //재생 시 바의 길이 조정

  const rangeRef = useRef();
  const thumbRef = useRef();

  useEffect(() => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width;    //현재 너비를 가져옴
    const thumbWidth = 20;
    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentage -
      (thumbWidth / 100) * percentage;

    setPosition(percentage);
    setMarginLeft(centerThumb);
    setProgressBarWidth(centerProgressBar);
  }, [percentage]);

  const timeStamp = timeline.map((el) => {
    const thisTime = el.split(":").map((el) => parseFloat(el));
    let start = 0

    if (thisTime.length === 2) {
      start = thisTime[0] *60 + thisTime[1];
    } else {
      start = thisTime[0] * 3600 + thisTime[1] * 60 + thisTime[2];
    }

    console.log()
  })

  return (
    <SliderContainer>
      <GlobalStyle />
      <ProgressBar width={progressBarWidth} />
      <Thumb position={position} ref={thumbRef} marginLeft={marginLeft} />
      <Range
        type={"range"}
        ref={rangeRef}
        step={"0.01"}
        onChange={onChange}
        value={position}
      />
    </SliderContainer>
  );
};

export default Soundbar;

const Range = styled.input`
  -webkit-appearance: none;
  background-color: rgba(8, 80, 214, 0.644);
  height: 10px;
  width: 100%;
  cursor: pointer;
  opacity: 0;
  margin: 0 auto;
`;

const Thumb = styled.div`
  width: var(--thumb-width);
  height: var(--thumb-height);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.753);
  z-index: 3;
  background: rgb(255, 255, 255);
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: ${(props) => props.position}%;
  transform: translate(0%, -50%);
  pointer-events: none;
  user-select: none;
  margin-left: ${(props) => props.marginLeft}px;
`;

const ProgressBar = styled.div`
  background-color: rgb(218, 55, 145);
  width: ${(props) => props.width}px;
  height: var(--progress-bar-height);
  display: block;
  position: absolute;
  border-radius: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  user-select: none;
  pointer-events: none;
`;

const SliderContainer = styled.div`
  --progress-bar-height: 5px;
  --thumb-width: 20px;
  --thumb-height: 20px;
  position: relative;
  width: 100%;

  &::before {
    content: "";
    background-color: gray;
    width: 100%;
    height: var(--progress-bar-height);
    display: block;
    position: absolute;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 1;
  }
`;
