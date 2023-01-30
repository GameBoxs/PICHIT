import { useState, useEffect } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../../action/GlobalStyle";
import NavigationButton from "./NavigationButton";

import { KAKAO_AUTH_SERVER } from "../../store/values"
import { useDispatch, useSelector } from "react-redux";
import { slicer } from "../../reducer/tokenSlicer";


function Navigation() {
  const [popup, setPopup] = useState();
  const token = useSelector(state => state.token)
  const dispatch = useDispatch()

  const handleOpenPop = () => {
    const width = 400;

    const popup = window.open(
      KAKAO_AUTH_SERVER,
      "KAKAO",
      `width=${width}`
    );

    setPopup(popup)
  }

  useEffect(()=> {
    const currentURL = window.location.href;
    const searchParams = new URL(currentURL).search.slice(7);

    if (searchParams) window.opener.postMessage(searchParams, window.location.origin)
  }, [])

  useEffect(()=> {
    const kakaoOAuthCodeListener = (e) => {
      if (e.origin !== window.location.origin) return

      dispatch(slicer(e.data))

      popup?.close()
      setPopup(null)
    }
    
    if (!popup) {
      return
    } else {
      window.addEventListener("message", kakaoOAuthCodeListener, false);
    }

    return () => {
      window.removeEventListener("message", kakaoOAuthCodeListener);
      popup?.close()
      setPopup(null)
    }

  }, [popup])
  
  console.log(token, "Token")

  return (
    <NavBody>
      {/*
        GlobalStyle - CSS Init
        NavTitle - Speak On Title
        NavigationButton - Menu Button
      */}
      <GlobalStyle/>
      <NavTitle>Speak On</NavTitle>
      <NavigationButton userName='' handleOpenPop={handleOpenPop}></NavigationButton>
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