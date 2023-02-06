import React, { memo } from "react";
import styled, { keyframes } from "styled-components";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useMemo } from "react";

//재생 버튼
const SoundBtn = ({ play, isPlaying }) => {

  return (
    <Circle>
      <BtnContainer isPlaying={isPlaying}>
        <PlayBtn onClick={play}>
          {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
        </PlayBtn>
      </BtnContainer>
      <CircleBack className="first" isPlaying={isPlaying} />
      <CircleBack className="second" isPlaying={isPlaying} />
    </Circle>
  );
};

export default memo(SoundBtn);

const waves = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const CircleBack = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  width: 6rem;
  height: 6rem;
  border-radius: 3rem;
  filter: blur(1px);
  z-index: 1;

  &.first {
    box-shadow: 0.4rem 0.4rem 0.8rem var(--greyLight-2),
      -0.4rem -0.4rem 0.8rem var(--white);
    background: linear-gradient(
      to bottom right,
      var(--greyLight-2) 0%,
      var(--white) 100%
    );
    animation: ${waves} 4s linear infinite;

    animation-play-state: ${(props) => (props.isPlaying ? null : "paused")};
  }

  &.second {
    box-shadow: 0.4rem 0.4rem 0.8rem var(--greyLight-2),
      -0.4rem -0.4rem 0.8rem var(--white);
    animation: ${waves} 4s linear 2s infinite;

    animation-play-state: ${(props) => (props.isPlaying ? null : "paused")};
  }
`;

const PlayBtn = styled.div`
  position: absolute;
  transition: all 0.2s linear;
`;

const BtnContainer = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  width: 6rem;
  height: 6rem;
  display: flex;
  margin: 0.6rem;
  justify-content: center;
  align-items: center;
  border-radius: 3rem;
  font-size: 3.2rem;
  color: var(--primary);
  z-index: 300;
  background: var(--greyLight-1);
  box-shadow: ${(props) =>
    props.isPlaying
      ? "inset 0.2rem 0.2rem 0.5rem var(--greyLight-2), inset -0.2rem -0.2rem 0.5rem var(--white)"
      : "0.3rem 0.3rem 0.6rem var(--greyLight-2),-0.2rem -0.2rem 0.5rem var(--white)"};
  cursor: pointer;
  position: relative;
`;

const Circle = styled.div`
  width: 9rem;
  height: 100%;
  justify-self: center;
  border-radius: 1rem;
  display: grid;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  margin-bottom: 3rem;

  svg {
    margin: 0 !important;
  }
`;
