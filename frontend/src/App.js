import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Presentational/common/Footer";

import Navigation from "./Presentational/common/Navigation";
import InterviewPage from "./Presentational/pages/Interview/InterviewPage";
import MainPage from "./Presentational/pages/MainPage";
import ReviewPage from "./Presentational/pages/ReviewPage";
import RoomPage from "./Presentational/pages/room/RoomPage";
import Pagination from "./Presentational/common/Pagination/Pagination"
import { GlobalStyle } from "./action/GlobalStyle";


function App() {
  const { pathname } = useLocation();
  const params =useParams();
  const roomId = params.id
  console.log(roomId)



  return (
    <AppContainer>
      <GlobalStyle />
      {(pathname.includes("interview")) ? null:<Navigation /> }

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
