import { useState, useEffect } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../../action/GlobalStyle";
import NavigationButton from "./NavigationButton";

import { KAKAO_AUTH_SERVER } from "../../store/values"
import { useDispatch, useSelector } from "react-redux";
import { slicer } from "../../reducer/tokenSlicer";


function Navigation({pathname}) {
  const [popup, setPopup] = useState();
  
  //state 값 가져오는 방법
  // const tokenRedux =  useSelector(state=> state.token)
  
  const dispatch = useDispatch()

  const handleOpenPop = () => {  //팝업 생성 함수
    const width = 400;

    //팝업 창 생성
    const popup = window.open(
      KAKAO_AUTH_SERVER,
      "KAKAO",
      `width=${width}`
    );

    setPopup(popup)
  }

  useEffect(()=> { //이벤트가 발생하면
    const currentURL = window.location.href;
    // url 객체 생성, 토큰 값만 정제해서 postMessage로 send
    const searchParams = new URL(currentURL).search.slice(7);

    //부모 객체로 searchParams 전송
    if (searchParams) window.opener.postMessage(searchParams, window.location.origin)
  }, [])

  useEffect(()=> { //팝업창이 생성되면
    const kakaoOAuthCodeListener = (e) => {
      if (e.origin !== window.location.origin) return

      //postMessage로 보낸 searchParams값이 들어있음(토큰)
      const token = e.data

      //Redux state 저장
      dispatch(slicer(token))

      //로컬스토리지에 token이란 이름으로 값 저장 
      localStorage.setItem('token', token)

      //작업 완료 후 알아서 팝업창 꺼지게
      popup?.close()
      setPopup(null)
    }
    
    if (!popup) {
      return
    } else {
      //postMessage로 값 받기
      window.addEventListener("message", kakaoOAuthCodeListener, false);
    }

    //message 이벤트 끝난 후 팝업 정리
    return () => {
      window.removeEventListener("message", kakaoOAuthCodeListener);
      popup?.close()
      setPopup(null)
      
      
    }

  }, [popup])

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