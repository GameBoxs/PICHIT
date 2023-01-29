import React, { useRef } from "react";
import styled from "styled-components";
// import { useScroll } from "../../action/hooks/useScroll";

import MainBottom from '../layout/mainpage/MainBottom'
import MainTop from '../layout/mainpage/MainTop'

const MainPage = () => {
  const MainDiv = useRef([]);

  const scrollWithUseRef = (idx) => {
    if (idx === 0)
      MainDiv.current[1]?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    else
      MainDiv.current[0]?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
  };

  return (
    <>
      <First ref={(el) => (MainDiv.current[0] = el)}>
        <MoveBtn onClick={() => scrollWithUseRef(0)}>DOWN</MoveBtn>
        <MainTop/>
      </First>
      <Second ref={(el) => (MainDiv.current[1] = el)}>
        <MoveBtn onClick={() => scrollWithUseRef(1)}>UP</MoveBtn>
        <MainBottom/>
      </Second>
    </>
  );
};

export default MainPage;

const MoveBtn = styled.div`
  cursor: pointer;
`;

const Second = styled.div`
  background-color: #ffffff;
  height: 100vh;
`;

const First = styled.div`
  background-color: #3ec7c2;
  height: 100vh;
`;
