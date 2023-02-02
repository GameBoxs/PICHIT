import React, { useRef } from "react";
import styled from "styled-components";

import MainBottom from "../layout/mainpage/MainBottom";
import MainTop from "../layout/mainpage/MainTop";

import { TiStarburst, TiStarburstOutline } from "react-icons/ti";

const MainPage = () => {
  const MainDiv = useRef([]);
  const test = {
    userId: 1,
    id: 1,
    title: "테스트 되고 있나용",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  };
  // const data = useAxios('https://jsonplaceholder.typicode.com/comments', "GET")
  // const data = useAxios('https://jsonplaceholder.typicode.com/posts/1', "PUT", test)

  // const testRedux = useSelector(state => state)

  // console.log(testRedux)

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

  const TapeContent = new Array(10).fill().map((_, idx) => {
    return <TapeCompo key={idx} num={idx}/>;
  });

  return (
    <MainPageLayout>
      <First ref={(el) => (MainDiv.current[0] = el)}>
        <MoveBtn onClick={() => scrollWithUseRef(0)}>게시판 바로가기</MoveBtn>
        <MainTop />

        <FrontTape>{TapeContent}</FrontTape>
        <BackgroundTape />
      </First>
      <Second ref={(el) => (MainDiv.current[1] = el)}>
        {/* <MoveBtn onClick={() => scrollWithUseRef(1)}>UP</MoveBtn> */}
        <MainBottom />
      </Second>
    </MainPageLayout>
  );
};

export default MainPage;

function TapeCompo({ num }) {
  return (
    <Tape>
      {num % 2 === 0 ? <TiStarburst /> : <TiStarburstOutline />}
      PICHIT
    </Tape>
  );
}

const Tape = styled.div`
  color:var(--white);
  display:flex;
  align-items: center;
  margin-inline: 1rem;

  * {
    margin-inline: 1rem;
  }
`;

const FrontTape = styled.div`
  width: 120vw;
  height: 10vh;
  background-color: var(--primary);
  position: absolute;
  left: -5vw;
  top: 88vh;
  transform: rotate(-2deg);
  z-index: 3;

  display:flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 600;
`;

const BackgroundTape = styled.div`
  width: 120vw;
  height: 10vh;
  background-color: var(--primary-light);
  position: absolute;
  left: -5vw;
  top: 85vh;
  transform: rotate(3deg);
`;

const MoveBtn = styled.div`
  cursor: pointer;
  position: absolute;
  z-index: 10;
    top: 70vh;
  -webkit-transition: color 200ms ease, 200ms ease;
  transition: color 200ms ease, 200ms ease;
  text-decoration: none;
  //link.black클래스로 있던거
  display: inline-block;
  border-bottom-color: var(--primary);
  color: var(--primary);
  cursor:pointer;

  &:hover {
    //link클래스로 있던거
    border-bottom-color: var(--primary-light);
    color: var(--primary-light);
  }
`;

const Second = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: 1em 3em;
`;

const First = styled.div`
  background-color: var(--white);
  height: 100vh;
  position: relative;
  padding: 1em 3em;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const MainPageLayout = styled.div`
  margin-bottom: 10vh;
  height: 250vh;
  margin: 0 auto;
  overflow-x: hidden;
`;
