import styled from "styled-components";
import RoomList from "../../component/RoomList";

const DUMMY_DATA = [
  {
    id: 1,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
  },
  {
    id: 1,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
  },
  {
    id: 2,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
  },
  {
    id: 3,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
  },
  {
    id: 4,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
  },
  {
    id: 5,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
  },
  {
    id: 6,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
  },
  {
    id: 7,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
  },
  {
    id: 8,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
  },
  {
    id: 9,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
  },
  {
    id: 10,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
  },
];

function MainBottom() {
  return (
    <Layout>
      <Header>
        <h1> LOOM LIST</h1>
        <Titlesection>
          <p>대충 설명이 들어가겠죠?</p>
          <div>
            <button>TOTAL</button>
            <button>MY</button>
          </div>
        </Titlesection>
      </Header>
      <section>
        <Main>
          <h4>검색창이 들어갈 예정입니다</h4>
          <div>
            <button>모든 방</button>
            <button>입장가능</button>
          </div>
          <LommList>
            <RoomList rooms={DUMMY_DATA} />
          </LommList>
        </Main>
        <footer>
          <button>방만들기</button>
        </footer>
      </section>
    </Layout>
  );
}
export default MainBottom;

const Layout = styled.div``;

const Header = styled.div`
  border-bottom: 2px solid gray;
`;

const Titlesection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Main = styled.div`
  border: 1px solid black;
`;

const LommList = styled.div`
  border: 2px solid red;
`;
