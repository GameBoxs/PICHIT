import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import Footer from "./Presentational/common/Footer";

import "./font.css";

import Navigation from "./Presentational/common/Navigation";
import InterviewPage from "./Presentational/pages/Interview/InterviewPage";
import MainPage from "./Presentational/pages/MainPage";
import ReviewPage from "./Presentational/pages/ReviewPage";
import RoomPage from "./Presentational/pages/RoomPage";
import Pagination from "./Presentational/common/Pagination/Pagination";
import { GlobalStyle } from "./action/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import { KAKAO_AUTH_SERVER } from "./store/values";
import { slicer } from "./reducer/tokenSlicer";
import useAxios from "./action/hooks/useAxios";
import { setUserInfo } from "./reducer/userStore";
import axios from "axios";

import { PITCHIT_URL } from "./store/values";

function App() {
  const { pathname } = useLocation();
  const [popup, setPopup] = useState();
  const token = useSelector(state=>state.token)
  const dispatch = useDispatch();

  const handleOpenPop = () => {
    //팝업 생성 함수
    const width = 400;

    //팝업 창 생성
    const popup = window.open(KAKAO_AUTH_SERVER, "KAKAO", `width=${width}`);

    setPopup(popup);
  };

  useEffect(() => {
    //이벤트가 발생하면
    const currentURL = window.location.href;
    // url 객체 생성, 토큰 값만 정제해서 postMessage로 send
    const searchParams = new URL(currentURL).search.slice(7);

    //부모 객체로 searchParams 전송
    if (searchParams)
      window.opener.postMessage(searchParams, window.location.origin);
  }, []);

  useEffect(() => {
    //팝업창이 생성되면
    const kakaoOAuthCodeListener = (e) => {
      if (e.origin !== window.location.origin) return;

      //postMessage로 보낸 searchParams값이 들어있음(토큰)
      const token = e.data;

      //Redux state 저장
      dispatch(slicer(token));

      console.log(e.data);

      //로컬스토리지에 token이란 이름으로 값 저장
      localStorage.setItem("token", token);

      //작업 완료 후 알아서 팝업창 꺼지게
      popup?.close();
      setPopup(null);
    };

    if (!popup) {
      return;
    } else {
      //postMessage로 값 받기
      window.addEventListener("message", kakaoOAuthCodeListener, false);
    }

    //message 이벤트 끝난 후 팝업 정리
    return () => {
      window.removeEventListener("message", kakaoOAuthCodeListener);
      popup?.close();
      setPopup(null);

      window.location.reload();
    };
  }, [popup]);

  useEffect(()=>{
    if (token !== null) {
      axios({
        method: "GET",
        url: `${PITCHIT_URL}/userinfo`,
        headers: {
          Authorization: token,
        }
      })
        .then((res) => {
          dispatch(setUserInfo(res.data));
        })
        .catch((err) => console.log(err))
    }
  }, [token])

  return (
    <AppContainer>
      <GlobalStyle />
      {pathname.includes("interview") ? null : (
        <Navigation
          handleOpenPop={handleOpenPop}
        />
      )}

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/room/:id" element={<RoomPage />} />
        <Route path="/interview/*" element={<InterviewPage />} />
        <Route path="/pagination" element={<Pagination />} />
      </Routes>

      {/* {(pathname.includes("interview")) ? null:<Footer /> } */}
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div``;
