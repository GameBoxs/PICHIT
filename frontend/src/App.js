import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Presentational/common/Footer";

import Navigation from "./Presentational/common/Navigation";
import MainPage from "./Presentational/pages/MainPage";
import ReviewPage from "./Presentational/pages/ReviewPage";
import RoomPage from "./Presentational/pages/RoomPage";

const expenses = [
  {
    id: 'e1',
    title: '면접 들어와',
    people: 4,
    date: new Date(2023, 1, 15),
    content:'이 정보는 테스트용 정보 입니다.가나다라마바사아자차카타파하.이 정보는 테스트용 정보 입니다.가나다라마바사아자차카타파하'

  }
]

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Navigation />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/room/*" element={<RoomPage items={expenses}/>} />
        </Routes>
        <Footer />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;

const AppContainer = styled.div`
  position: relative;
  min-height: 100%;
  padding-bottom: 960px;
`;

// footer 고정할려고 padding-bottom을 줬는데, 간격이 너무 넒어져서 
// 고칠 필요가 있음...
