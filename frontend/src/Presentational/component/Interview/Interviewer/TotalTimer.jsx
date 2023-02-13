import React, { useState } from "react";
import styled from "styled-components";
import useInterval from "../../../../action/hooks/useInterval";

const TotalTimer = () => {
  let [count, setCount] = useState(0);
  const delay = 1000;

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, delay);

  let m = Math.floor((count % 3600) / 60);
  let s = Math.floor((count % 3600) % 60);
  let h = Math.floor(count / 3600);

  let sDisplay = s > 0 ? (s < 10 ? "0" + s.toString() : s) : "00";
  let mDisplay = m > 0 ? (m < 10 ? "0" + m.toString() : m) : "00";
  let hDisplay = h > 0 ? h : "00";
  
  let tmpArr = [];

  tmpArr = [hDisplay, mDisplay, sDisplay];

  return <TimerWrap>{tmpArr.join(':')}</TimerWrap>;
};

export default TotalTimer;

const TimerWrap = styled.div``;
