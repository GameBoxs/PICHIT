import styled from "styled-components";
import { GlobalStyle } from "../../action/GlobalStyle";
import NavigationButton from "./NavigationButton";

function Navigation(props) {
  return (
    <NavBody>
      {/*
        GlobalStyle - CSS Init
        NavTitle - Speak On Title
        NavigationButton - Menu Button
      */}
      <GlobalStyle/>
      <NavTitle>Speak On</NavTitle>
      <NavigationButton userName=''></NavigationButton>
    </NavBody>
  )
}

export default Navigation;

const NavBody = styled.div`
  width: 100%;
  height: 100px;
  display: table;
  z-index: 100;
`

const NavTitle = styled.p`
  font-size: 30px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`