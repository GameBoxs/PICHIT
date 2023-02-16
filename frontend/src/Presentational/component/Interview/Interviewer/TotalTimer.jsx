import React, { useState } from "react";
import styled from "styled-components";
import useInterval from "../../../../action/hooks/useInterval";

const TotalTimer = () => {
  let [count, setCount] = useState(0);  //시간 값
  const delay = 1000;   //흘러가는 시간 단위

  useInterval(() => {
    setCount(count + 1);
  }, delay);

  //시간/분/초 단위 계산 값
  let h = Math.floor(count / 3600);
  let m = Math.floor((count % 3600) / 60);
  let s = Math.floor((count % 3600) % 60);

  //10 이하의 숫자에 0 붙이기
  let sDisplay = s > 0 ? (s < 10 ? "0" + s.toString() : s) : "00";
  let mDisplay = m > 0 ? (m < 10 ? "0" + m.toString() : m) : "00";
  let hDisplay = h > 0 ? h : "00";
  
  let tmpArr = [];

  //시간/분/초 합치기
  tmpArr = [hDisplay, mDisplay, sDisplay];

  return <TimerWrap>{tmpArr.join(':')}</TimerWrap>;
};

export default TotalTimer;

const TimerWrap = styled.div``;
