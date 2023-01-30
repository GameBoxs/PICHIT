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
  const { pathname } = useLocation();

  return (
    <AppContainer>
      {(pathname.includes("interview")) ? null:<Navigation pathname={pathname} /> }

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
