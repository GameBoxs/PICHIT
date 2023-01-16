// import RoomPage from "./page/RoomPage";

// function App() {

// return (
//   <div className="App">
//     <RoomPage
//       items={expenses} />
//   </div>
// );

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
        {/* <Footer /> */}
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;

const AppContainer = styled.div``;
