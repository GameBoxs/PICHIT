import { useState, useEffect } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../../action/GlobalStyle";
import NavigationButton from "./NavigationButton";

function Navigation({handleOpenPop}) {

  return (
    <NavBody>
      {/*
        GlobalStyle - CSS Init
        NavTitle - Speak On Title
        NavigationButton - Menu Button
      */}
      <GlobalStyle/>
      {/* <NavTitle>Speak On</NavTitle> */}
      <NavigationButton userName='' handleOpenPop={handleOpenPop}></NavigationButton>
    </NavBody>
  )
}

export default Navigation;

const NavBody = styled.div`
  width: 100%;
  display: table;
  z-index: 100;
`

const NavTitle = styled.p`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`