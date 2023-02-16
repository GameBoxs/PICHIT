import React from "react";
import styled from "styled-components";
import { TiStarburst, TiStarburstOutline } from "react-icons/ti";

// 메인 화면에 보이는 디자인 요소 컴포넌트
function TapeCompo({ num }) {
  return (
    <Tape>
      {num % 2 === 0 ? <TiStarburst /> : <TiStarburstOutline />}
      PICHIT
    </Tape>
  );
}

const Tape = styled.div`
  color: var(--white);
  display: flex;
  align-items: center;
  margin: 0.5rem 1rem 0 1rem;
  font-family: 'SBAggroL';
  font-size: 3rem;

  * {
    margin-inline: 1rem;
  font-size: 3rem;
  }

  path {
    color: var(--white);
  }
`;

export default TapeCompo;
