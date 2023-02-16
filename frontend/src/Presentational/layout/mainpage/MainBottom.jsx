import { useState, useEffect } from "react";
import styled from "styled-components";

import TitleSection from "../../component/MainBoard/TitleSection";
import Loading from "../../common/Loading";

//통신
import useAxios from "../../../action/hooks/useAxios";

import { useSelector } from "react-redux";
import BoardBody from "./BoardBody";

function MainBottom() {
  // //페이지네이션
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [totalpages, setTotalPages] = useState(0); //전체 데이터 길이
  //조건검색
  const [aboutCondition, setAboutCondition] = useState({
    search: "",
    sort: "",
    finished: "",
  });

  //통신
  const [APIurl, serAPIurl] = useState("interviewrooms?&finished=0");
  const myCategory = `my-interviewrooms?finished=0&page=${currentPage - 1}`;
  const totalCategory = `interviewrooms?&finished=0&page=${currentPage - 1}&title=${
    aboutCondition.search
  }&sort=${aboutCondition.sort}`;

  //로그인에 따른 카테고리 기본값
  const token = useSelector((state) => state.token); //으로 원래는 사용자 토큰을 받아야하는데 지금은 테스트라서 testToken으로 수민꺼 들고올거다.

  // TOTAL/MY 카테고리
  const [roomPosition, setRoomPosition] = useState(false); // false : total, true ; my
  
  //버튼을 통한 TOTAL/MY 값
  function roomSwitch(position) {
    if (position === "toTotal") {
      setRoomPosition(false);
      serAPIurl(totalCategory);
      setCurrentPage(1);

      //카테고리 이동후 초기화
      setAboutCondition((prev) => {
        return { ...prev, finished: "" };
      });
    } 
    else {
      setRoomPosition(true);
      serAPIurl(myCategory);
      setCurrentPage(1);

      //카테고리 이동후 초기화
      setAboutCondition((prev) => {
        return { ...prev, search: "", sort: "" };
      });
    }
  }

  //검색
  function conditionHandler(e, type) {
    setCurrentPage(1);
    setAboutCondition((prev) => {
      return {
        ...prev,
        [type]: e,
      };
    });
  }

  // roomlist통신
  const [data, setData] = useState([]); //total데이터 저장
  const [getData, isLoading] = useAxios(APIurl, "GET", token);

  useEffect(() => {
    if (getData && getData.data) {
      setData(getData);
      // setTotalElements(totalElements=>getData.data.totalElements); //데이터 전체 수
      setTotalPages((totalPages) => getData.data.totalPages); //페이지 전체 수
    }
  }, [getData]);
  //이거 로그인환경에서 처음에 null, total데이터, my데이터 로 값변경일어나면서 렌더링

  useEffect(() => {
    if (roomPosition) {
      serAPIurl(myCategory);
    } else {
      serAPIurl(totalCategory);
    }
  }, [currentPage, aboutCondition]);

  return (
    <Layout>
      <Header>
        <TitleSection
          roomPosition={roomPosition}
          roomSwitch={roomSwitch}
          token={token}
        />
      </Header>
      {isLoading === true ? (
        <Loading/>
      ) : (
        <BoardBody
          roomPosition={roomPosition}
          conditionHandler={conditionHandler}
          data={data.data}
          aboutCondition={aboutCondition}
          totalpages={totalpages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Layout>
  );
}

export default MainBottom;

const Layout = styled.div`
  height: fit-content;
  margin-bottom: 100px;
  width: 65vw;
  background-color: var(--greyLight-1);
  border-radius: 3vw;
  padding: 5vh 5vw;
`;

const Header = styled.div`
  padding: 4rem 0 1rem 0;

  & h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-family: "SBAggroB";
    color: var(--primary);
  }
`;