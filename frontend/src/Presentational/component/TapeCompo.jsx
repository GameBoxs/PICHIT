import React from "react";
import styled from "styled-components";
import { TiStarburst, TiStarburstOutline } from "react-icons/ti";

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
    margin: 0.5rem 1rem 0 1rem;
          font-family: SBagrroL;
  
    * {
      margin-inline: 1rem;
    }
  `;

export default TapeCompo