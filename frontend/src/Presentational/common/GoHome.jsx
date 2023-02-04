import React from "react";
import styled from "styled-components";
import { GlobalStyle } from "../../action/GlobalStyle";

function GoHome(params) {
  return <HomeNav>
    <GlobalStyle />
  </HomeNav>
}

export default GoHome;

const HomeNav = styled.div`
  width: 100%;
  height: 6vh;
  background-color: var(--primary);
  position: absolute;
  top: 0;
  left: 0;
`;
