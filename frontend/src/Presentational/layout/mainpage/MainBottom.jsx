import { useState , useEffect } from "react";
import styled from "styled-components";
import RoomList from "../../component/RoomList";
import TotalCategory from "../../component/TotalCategory"
import MyCategory from "../../component/MyCategory"

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CreateRoom from "../../component/CreateRoom";

const MySwal = withReactContent(Swal);
// React sweet alert 쓸려고 사용함 

const DUMMY_DATA = [
  {
    id: 1,
    Participant: 2,
    personnel: 4,
    title: "비밀방1",
    date: "23.01.24",
    secret: true
  },
  {
    id: 2,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
    secret: false
  },
  {
    id: 3,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
    secret: false
  },
  {
    id: 4,
    Participant: 2,
    personnel: 4,
    title: "비밀방2",
    date: "23.01.24",
    secret: true
  },
  {
    id: 5,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
    secret: false
  },
  {
    id: 6,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
    secret: false
  },
  {
    id: 7,
    Participant: 2,
    personnel: 4,
    title: "비밀방3",
    date: "23.01.24",
    secret: true
  },
  {
    id: 8,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
    secret: false
  },
  {
    id: 9,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
    secret: false
  },
  {
    id: 10,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
    secret: false
  },
];

const MY_ROOMS = [  {
    id: 1,
    Participant: 2,
    personnel: 4,
    title: "알밥",
    date: "23.01.24",
  },
  {
    id: 2,
    Participant: 2,
    personnel: 4,
    title: "짬뽕",
    date: "23.01.24",
  },
  {
    id: 3,
    Participant: 2,
    personnel: 4,
    title: "탕수육",
    date: "23.01.24",
  },
]

function MainBottom() {
    //로그인여부
    const [isLogined,setIsLogined] = useState(false) //false:비로그인, true:로그인
    //로그인(테스트용)
    function loginBtn() {
        if(isLogined===false){
            setIsLogined(true)
            console.log(isLogined)
            const btnElement = document.getElementById('btn');
            btnElement.innerText = '로그인상태';
        }
        else{
            setIsLogined(false)
            console.log(isLogined)
            const btnElement = document.getElementById('btn');
            btnElement.innerText = '지금은 비로그인';
        }      
    }
    
    //더미데이터(변경을 위해, useState에 넣어둠)
    const [data, setData] = useState(DUMMY_DATA);
    

    //////////////////  <<<  total/my 사용자정렬  >>>>  ////////////////
    //사용자 정렬
    const [roomPosition,setRoomPosition] = useState(false) // false : total, true ; my
    //버튼이 따른 변경
    function roomSwitch(){
        if(roomPosition){
            setRoomPosition(false)
            setData(DUMMY_DATA)
        }
        else{
            setRoomPosition(true)
            setData(MY_ROOMS)
        }
    }

    useEffect(()=>{
        if(isLogined===false){
            setRoomPosition(false)
            setData(DUMMY_DATA)
        }
        else{
            setRoomPosition(true)
            setData(MY_ROOMS)

        }
    },[isLogined])

    // sweet alert로 방 만들기 모달 생성 
    const showSwalWithLink = () => {
      MySwal.fire({
        title:'방 생성하기',
        width:800,
        showConfirmButton:true,
        showCancelButton:true,
        confirmButtonText:"생성하기",
        cancelButtonText:"취소",
        html:(
          <div>
            <CreateRoom />
          </div>
        )
      })
    }


  return (
    <Layout>
         {/* 로그인 상태에 따른거(테스트용)  */}
        <button id='btn' onClick={loginBtn}>지금은 비로그인</button>
       
      <Header>
        <h1> LOOM LIST</h1>
        <Titlesection>
          <p>대충 설명이 들어가겠죠?</p>
          <div>
            <button onClick={roomSwitch}>TOTAL</button>
            <button onClick={roomSwitch}>MY</button>
          </div>
        </Titlesection>
      </Header>
      <section>
        <Main>
            {roomPosition ? <MyCategory/> : <TotalCategory/>}
          <RoomListdiv>
            <RoomList rooms={data} />
          </RoomListdiv>
        </Main>
        <Footer>
          <button onClick={showSwalWithLink}>방만들기</button>
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

const RoomListdiv = styled.div``;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;


