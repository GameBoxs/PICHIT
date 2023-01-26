import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import useGet from "../../action/hooks/useGet";
import usePost from "../../action/hooks/usePost";
// import { useScroll } from "../../action/hooks/useScroll";

import MainBottom from '../layout/mainpage/MainBottom'

const MainPage = () => {
  const MainDiv = useRef([]);
  const test = {
    "title": "string",
    "description": "string",
    "maxPersonCount": 2,
    "password": "asd",
    "finished": 0,
    "startDate": "2023-01-24T08:40:10.495Z",
    "managerId": 1
  }
  // const [data] = useGet('https://jsonplaceholder.typicode.com/comments')
  // const [data] = usePost('http://hamchu-dev.shop:8811/interviewrooms', test)
  const [value, setValue] = useState();

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
        First
        <MoveBtn onClick={() => scrollWithUseRef(0)}>DOWN</MoveBtn>
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
  background-color: aqua;
  height: 100vh;
`;
