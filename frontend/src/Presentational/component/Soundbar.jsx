import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../../action/GlobalStyle";

const Soundbar = ({ onChange, percentage, timeline, duration }) => {
  const [style, setStyle] = useState({
    position: 0, //Thumb 위치 지정
    marginLeft: 0, //Thumb 좌측 margin 설정
    progressBarWidth: 0, //재생 시 바의 길이 조정
  });
  const [timeStamp, setTimeStamp] = useState([]);

  const rangeRef = useRef();
  const thumbRef = useRef();
  const prograssbarRef = useRef();

  useEffect(() => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width; //현재 너비를 가져옴
    const thumbWidth = 20;
    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentage -
      (thumbWidth / 100) * percentage;

    setStyle(() => {
      return {
        position: percentage,
        marginLeft: centerThumb,
        progressBarWidth: centerProgressBar,
      };
    });

    setTimeStamp(() => {
      return timeline.map((el) => {
        const thisTime = el.split(":").map((el) => parseFloat(el));
        let start = 0;

        if (thisTime.length === 2) {
          start = thisTime[0] * 60 + thisTime[1];
        } else {
          start = thisTime[0] * 3600 + thisTime[1] * 60 + thisTime[2];
        }

        return (start / duration) * rangeWidth;
      });
    });
  }, [percentage, timeline]);

  return (
    <SliderContainer>
      <GlobalStyle />

      <ProgressBar ref={prograssbarRef} width={style.progressBarWidth}>
        {timeStamp.map((el, idx) => {
          return <TimeStampBox key={idx} timeStampMargin={el} />;
        })}
      </ProgressBar>

      <Thumb
        position={style.position}
        ref={thumbRef}
        marginLeft={style.marginLeft}
      />

      <Range
        type={"range"}
        ref={rangeRef}
        step={"0.01"}
        onChange={onChange}
        value={style.position}
      />
    </SliderContainer>
  );
};

export default memo(Soundbar);

const TimeStampBox = styled.div`
  position: absolute;
  height: 0.5rem;
  width: 2.5px;
  background-color: var(--greyLight-1);
  margin-left: ${(props) => props.timeStampMargin}px;
  display: inline-block;
`;

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
  background: var(--white);
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: ${(props) => props.position}%;
  transform: translate(0%, -50%);
  pointer-events: none;
  user-select: none;
  margin-left: ${(props) => props.marginLeft}px;
  box-shadow: 0px 0.1rem 0.3rem 0px var(--greyLight-3);
`;

const ProgressBar = styled.div`
  background: var(--primary);
  background: linear-gradient(
    -1deg,
    var(--primary-dark) 0%,
    var(--primary) 50%,
    var(--primary-light) 100%
  );
  width: ${(props) => props.width}px;
  height: 0.5rem;
  display: block;
  position: absolute;
  border-radius: 10px;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2),
    -0.2rem -0.2rem 0.5rem var(--white);
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
    box-shadow: inset .2rem .2rem .5rem var(--greyLight-2), inset -.2rem -.2rem .5rem var(--white);
    background-color: var(--greyLight-2);
    width: 100%;
    height: 0.5rem;
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
