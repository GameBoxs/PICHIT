import styled from "styled-components";
import RoomList from "../../component/RoomList";
import React,{useState,useEffect,useCallback,useMemo} from "react";

const DUMMY_DATA = [
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
  const handleChange = (content) => {
    console.log(content.target.value);
  };

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
            <SearchWrapper>
                <input type="text" className="search-input" onChange={handleChange} placeholder="검색어를 입력해주세용"/>
            </SearchWrapper>
          <div>
            <button>모든 방</button>
            <button>입장가능</button>
          </div>
          <LommListdiv>
            <RoomList rooms={DUMMY_DATA} />
          </LommListdiv>
        </Main>
        <Footer>
          <button>방만들기</button>
        </Footer>
      </section>
    </Layout>
  );
}
export default MainBottom;

const Layout = styled.div`
  margin-left: 10%;
  margin-right: 10%;
`;

const Header = styled.div`
  border-bottom: 2px solid gray;
  padding: 10px 3% 10px 7%;
`;

const Titlesection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Main = styled.div`
  margin: 3% 10% 0% 10%;
  .search-input {
    width: 100%;
  }
`;

const LommListdiv = styled.div``;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const SearchWrapper = styled.div``;
