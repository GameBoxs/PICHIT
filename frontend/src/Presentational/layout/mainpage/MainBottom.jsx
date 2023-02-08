import { useState, useEffect } from "react";
import styled from "styled-components";

import TotalCategory from "../../component/TotalCategory";
import MyCategory from "../../component/MyCategory";
import PageBar from "../../common/Pagination/PageBar";
import CreateRoom from "../../component/CreateRoom";
import Button from "../../common/Button";
import RoomListBox from "../../component/RoomListBox"
//sweetalert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
//통신
import useAxios from "../../../action/hooks/useAxios";
import { testToken } from "../../../store/values";
//페이지네이션
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
// const token = useSelector(state => state.token)
// https://i8d107.p.ssafy.io/api

// const MySwal = withReactContent(Swal);
// // React sweet alert 쓸려고 사용함

function MainBottom() {
  // //페이지네이션
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [postsPerPage, setPostsPerPage] = useState(9); //페이지당 게시물 수
  const [totalElements, setTotalElements] = useState(0); //전체 데이터 길이
  const [totalpages, setTotalPages] = useState(0); //전체 데이터 길이

  //통신(카테고리)
  const [APIurl,serAPIurl] = useState()
  const [search, setSearch]=useState("");
  const myCategory = `my-interviewrooms?page=${currentPage-1}`
  const totalCategory = `interviewrooms?page=${currentPage-1}&title=${search}`
  // http://i8d107.p.ssafy.io/api/my-interviewrooms?page=0&size=1

  //로그인에 따른 카테고리 기본값
  const [isLogined, setIsLogined] = useState(false) //false : 비로그인, true : 로그인
  const token = useSelector(state => state.token)//으로 원래는 사용자 토큰을 받아야하는데 지금은 테스트라서 testToken으로 수민꺼 들고올거다.
  // useEffect(()=>{
  //   if(token){
  //     setIsLogined(true)
  //     serAPIurl(myCategory)
  //   }
  //   else{
  //     setIsLogined(false)
  //     serAPIurl(totalCategory)
  //   }
  // },[isLogined])
  
  // TOTAL/MY 카테고리
  const [roomPosition, setRoomPosition] = useState(false); // false : total, true ; my

  //버튼을 통한 TOTAL/MY 값
  function roomSwitch(position) {
    if (position === "toTotal") {
      setRoomPosition(false);
      setCurrentPage(1);
      serAPIurl(totalCategory);
    } else {
      setRoomPosition(true);
      setCurrentPage(1);
      serAPIurl(myCategory);
    }
  }

  //검색
  function searchHandler(e) {
    console.log(e);
    setSearch(e);
  }

  // roomlist통신
  const [data, setData] = useState([]) //total데이터 저장
  const [getData, isLoading] = useAxios(
    APIurl,'GET',token,
    );
    useEffect(() => {
      if(getData && getData.data){
        // console.log(getData.data)
        setData(getData)
        setTotalElements(getData.data.totalElements) //데이터 전체 수
        setTotalPages(getData.data.totalPages) //페이지 전체 수
      }
    }, [getData]);
    
    useEffect(()=>{
      if(roomPosition){
        serAPIurl(myCategory)
      }
      else{
        serAPIurl(totalCategory)
      }
    },[currentPage, search])      


  //방생성하기
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <Layout>
      <Header>
        <h1> ROOM LIST</h1>
        <Titlesection>
          <p>
            {roomPosition
              ? "내가 참여한 목록입니다(예정만 보여줌)"
              : "모든방 목록입니다"}
          </p>
          <div>
            <button
              onClick={() => {
                roomSwitch("toTotal");
              }}
            >
              TOTAL
            </button>
            <button
              onClick={() => {
                if (token) {
                  roomSwitch("toMy");
                } else {
                  // console.log('못넘어간다')//여기에 스윗알럿 하면 될듯
                }
              }}
            >
              MY
            </button>
          </div>
        </Titlesection>
      </Header>
      {
          isLoading===true? <div>loading...</div> :
      <section>
        <Main>
          {roomPosition ? <MyCategory /> : <TotalCategory searchHandler={searchHandler} />}
          {/* {roomPosition ? null : <TotalCategory />} */}
          <RoomListdiv>
              {data.data ?<RoomListBox search={search} roomsData={data.data} roomPosition={roomPosition}/> : <div>loading...</div>}
            </RoomListdiv>
            <PaginationBox>
              <GrFormPrevious size={50} />
              <PageBar
                totalPosts={totalElements} //전체 데이터 길이
                postsPerPage={postsPerPage} //페이지당 게시물 수
                setCurrentPage={setCurrentPage} //현재 페이지를 계산하는 함수
                currentPage={currentPage} //현재페이지
                totalpages={totalpages} //페이지 길이
              />
              <GrFormNext size={50} />
            </PaginationBox>
          </Main>
          <Footer>
            <button onClick={showModal}>방만들기</button>
            {modalOpen && <CreateRoom setModalOpen={setModalOpen} />}
          </Footer>
        </section>
      }
    </Layout>
  );
}
export default MainBottom;

const Layout = styled.div`
  /* margin-inline: 15rem; */
  margin-bottom: 100px;
  width: 65vw;
`;

const Header = styled.div`
  border-bottom: 2px solid gray;
  padding: 4rem 0 1rem 0;

  & h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }
`;

const Titlesection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Main = styled.div`
  margin: 0;
  .search-input {
    width: 100%;
    margin-block: 2rem 1.5rem;
  }
`;

const RoomListdiv = styled.div`
  margin-block: 1rem 3rem;
  height: 30rem;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
