import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InfiniteLoopSlider from "../../component/InfiniteLoopSlider";

const sentence = [
  "면접관이 들어옵니다",
  "면접관이 자리를 정리합니다",
  "면접관이 간단하게 인사를 나눕니다",
  "면접관이 당신의 자소서를 확인합니다",
  "면접자의 차례가 되었습니다",
  "면접자의 이름이 불립니다",
  "면접실로 입장합니다",
];

const PrepareInterview = () => {
  const [count, setCount] = useState(0);

  //타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  //준비중입니다 옆에 점 찍히는 거
  const dots = () => {
    let dotArray = [];

    switch (count % 4) {
      case 1:
        dotArray = Array(1).fill(0);
        break;
      case 2:
        dotArray = Array(2).fill(0);
        break;
      case 3:
        dotArray = Array(3).fill(0);
        break;
      default:
        dotArray = [];
        break;
    }

    return dotArray.map((_, idx) => {
      return <Dot key={idx} />;
    });
  };

  return (
    <Container>
      <Prepare>
        준비 중입니다
        {dots()}
      </Prepare>

      {/* sentance 보여주는 곳 */}
      <SentanceBox>
        {/* 무한 스크롤 해주는 곳 */}
        <InfiniteLoopSlider>
          {sentence.map((sen) => {
            return <InnerBox key={sen}>{sen}</InnerBox>;
          })}
        </InfiniteLoopSlider>
        {/* 가장자리 투명하게 */}
        <Fade />
      </SentanceBox>
    </Container>
  );
};

export default PrepareInterview;

const InnerBox = styled.div`
  width: 20em;
  margin-block: 0.8em;
  font-size: 1.2em;
  text-align: center;
  color : var(--primary);
`;

const Fade = styled.div`
  pointer-events: none;
  background: linear-gradient(
    /* 방향 설정 */ 180deg,
    var(--greyLight-1),
    transparent 30%,
    transparent 70%,
    var(--greyLight-1)
  );
  position: absolute;
  height: inherit;
  inset: 0;
`;

const SentanceBox = styled.div`
  position: relative;
  height: 3em;
  overflow: hidden;
`;

const Dot = styled.div`
  background-color: var(--primary);
  width: 0.2em;
  height: 0.2em;
  border-radius: 1em;
  margin-inline: 0.1em;
`;

const Prepare = styled.h1`
  position: relative;
  z-index: 4;
  font-size: 3em;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color : var(--primary);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: var(--greyLight-1);
  font-family: 'SBAggroL';
`;
