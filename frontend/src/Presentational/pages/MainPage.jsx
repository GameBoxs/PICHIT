import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import useAxios from "../../action/hooks/useAxios";
// import { useScroll } from "../../action/hooks/useScroll";

import MainBottom from '../layout/mainpage/MainBottom'
import MainTop from '../layout/mainpage/MainTop'

const MainPage = () => {
  const MainDiv = useRef([]);
  const test = {
    "userId": 1,
    "id": 1,
    "title": "테스트 되고 있나용",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  }
  // const data = useAxios('https://jsonplaceholder.typicode.com/comments', "GET")
  // const data = useAxios('https://jsonplaceholder.typicode.com/posts/1', "DELETE", test)

  // console.log(data)

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
