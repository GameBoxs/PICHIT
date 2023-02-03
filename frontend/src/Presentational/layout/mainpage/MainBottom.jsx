import { useState, useEffect } from "react";
import styled from "styled-components";

import RoomList from "../../component/RoomList";
import TotalCategory from "../../component/TotalCategory";
import MyCategory from "../../component/MyCategory";
import PageBar from "../../common/Pagination/PageBar";
import EmptyRoomList from "../../component/EmptyRoomList";
import CreateRoom from "../../component/CreateRoom";
//sweetalert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
//통신
import useAxios from '../../../action/hooks/useAxios';
import {testToken} from "../../../store/values"
//카테고리
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
  // const token = useSelector(state => state.token)
  // const info = useSelector(state => state.userinfo)
  // https://i8d107.p.ssafy.io/api

// const MySwal = withReactContent(Swal);
// // React sweet alert 쓸려고 사용함 

function MainBottom() {
  
  // //페이지네이션
  const [currentPage, setCurrentPage] = useState(1); //현재페이지
  const [postsPerPage, setPostsPerPage] = useState(9); //페이지당 게시물 수
  const [totalElements, setTotalElements] = useState(0); //전체 데이터 길이
  const [totalpages, setTotalPages] = useState(0); //전체 데이터 길이
  
  const [APIurl,serAPIurl] = useState()
  const myCategory = `my-interviewjoins?size=9&page=${currentPage-1}&finished=0`
  const totalCategory = `interviewrooms?page=${currentPage-1}`
  
  //로그인에 따른 카테고리 기본값
  const [isLogined, setIsLogined] = useState(false) //false : 비로그인, true : 로그인
  const token = useSelector(state => state.token)//으로 원래는 사용자 토큰을 받아야하는데 지금은 테스트라서 testToken으로 수민꺼 들고올거다.
  useEffect(()=>{
    if(token){
      setIsLogined(true)
      serAPIurl(myCategory)
    }
    else{
      setIsLogined(false)
      serAPIurl(totalCategory)
    }
  },[isLogined])
  
  // TOTAL/MY 카테고리
  const [roomPosition, setRoomPosition] = useState(false); // false : total, true ; my
  
  //버튼을 통한 TOTAL/MY 값
  function roomSwitch(position) {
    if(position === "toTotal") {
    setRoomPosition(false);
    setCurrentPage(1)
    serAPIurl(totalCategory)
    } else {
    setRoomPosition(true);
    setCurrentPage(1)
    serAPIurl(myCategory)
  }
  }
  
  // roomlist통신
  const [data, setData] = useState([]) //total데이터 저장
  const [getData, isLoading] = useAxios(
    // APIurl,'GET',testToken,
    APIurl,'GET',token,
    );
    useEffect(() => {
      if(APIurl===myCategory){
        console.log(getData.data)
      }
      if(getData && getData.data){
        console.log(getData.data)
        setData(getData)
        setTotalElements(getData.data.totalElements) //데이터 전체 수
        setTotalPages(getData.data.totalPages) //페이지 전체 수
        console.log('데이터 불러오는중')
      }
      console.log('페이지가변하면서 얘도 바뀜')
    }, [getData]);
    console.log(isLogined+'사용자'+APIurl+'일 때'+roomPosition+'이고, 엑시오스 상태'+getData)/////////////////////////////////

    useEffect(()=>{
      if(roomPosition){
        serAPIurl(myCategory)
      }
      else{
        serAPIurl(totalCategory)
      }
    },[totalCategory, myCategory])

    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
      setModalOpen(true)
    }

  return (
    <Layout>
      <Header>
        <h1> LOOM LIST</h1>
        <Titlesection>
          <p>{roomPosition ? '내가 참여한 목록입니다(예정만 보여줌)' : '모든방 목록입니다'}</p>
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
                if(token){
                  roomSwitch("toMy");
                }
                else{
                  console.log('못넘어간다')//여기에 스윗알럿 하면 될듯
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
          {/* {roomPosition ? <MyCategory /> : <TotalCategory />} */}
          <RoomListdiv>
            {data.length === 0 ? (
              <EmptyRoomList />
            ) : (
              // <RoomList rooms={currentPosts} />
              <RoomList rooms={data.data.content} />
            )}
          </RoomListdiv>
          <PageBar
            totalPosts={totalElements} //전체 데이터 길이
            postsPerPage={postsPerPage} //페이지당 게시물 수
            setCurrentPage={setCurrentPage} //현재 페이지를 계산하는 함수
            currentPage={currentPage} //현재페이지
            totalpages={totalpages} //페이지 길이
          />
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
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
