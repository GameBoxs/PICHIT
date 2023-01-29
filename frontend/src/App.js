import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Presentational/common/Footer";

import Navigation from "./Presentational/common/Navigation";
import InterviewPage from "./Presentational/pages/Interview/InterviewPage";
import MainPage from "./Presentational/pages/MainPage";
import ReviewPage from "./Presentational/pages/ReviewPage";
import RoomPage from "./Presentational/pages/room/RoomPage";
import Pagination from "./Presentational/common/Pagination/Pagination"

import { KAKAO_AUTH_SERVER } from "./store/index.js"

const expenses = [
  {
    id: "e1",
    title: "면접 들어와",
    people: 4,
    date: new Date(2023, 1, 15),
    content:
      "이 정보는 테스트용 정보 입니다.가나다라마바사아자차카타파하.이 정보는 테스트용 정보 입니다.가나다라마바사아자차카타파하",
  },
];

function App() {
  const [popup, setPopup] = useState();
  const { pathname } = useLocation();

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

      console.log(e.data)

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

  return (
    <AppContainer>
      {(pathname.includes("interview")) ? null:<Navigation handleOpenPop={handleOpenPop}/> }

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/room/*" element={<RoomPage items={expenses} />} />
        <Route path="/interview/*" element={<InterviewPage />} />
        <Route path="/pagination" element={<Pagination />} />
      </Routes>

      {/* {(pathname.includes("interview")) ? null:<Footer /> } */}

    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div``;
