import React from "react";
import styled, { keyframes } from "styled-components";

const InfiniteLoopSlider = ({ children }) => {
  return (
    <LoopSlider>
      <Inner>
        {children}
        {children}
      </Inner>
    </LoopSlider>
  );
};

export default InfiniteLoopSlider;

const loop = keyframes`
  /* 세로 방향으로 돌아가도록 변경(X->Y) */
    0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
`;

const Inner = styled.div`
  display: flex;

  /* 세로 방향으로 돌아가도록 변경 */
  flex-direction: column;
  width: fit-content;
  animation-name: ${loop};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-duration: var(--duration);
`;

const LoopSlider = styled.div`
  --duration: 18000ms;
`;
