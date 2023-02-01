import styled from "styled-components";
import Title from "../../common/Title"
import PlanTime from "../../component/PlanTime"

import React,{useState} from "react";
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import EditRoom from "../../component/EditRoom";



const MySwal = withReactContent(Swal);

function RoomHeader({join,joinRoom,data,host}) {
  // console.log(roomData)
  const showSwalWithLink = () => {
    MySwal.fire({
      title: "방 수정하기",
      width:800,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText:"수정하기",
      cancelButtonText:"취소",
      html:(
        <div>
          <EditRoom />
        </div>
      )
    })
  }

  const title = data.title
  const startDate=data.startDate




  const joinHandler = () => {
    joinRoom(!join)
  }


    return (
        <>
        <Layout>
          <Left>
            <Title title={title} />
            <Title title={startDate} />
          </Left>
        { host ?  // host 인지 아닌지 판별

        <button onClick={showSwalWithLink}>수정하기</button>
        :( join ? 
          <button>나가기</button>
          :
          <button onClick={joinHandler}>참여하기</button>

        )

        
        }
        </Layout>
        </>
    )
}

export default RoomHeader;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  border-bottom: 2px solid gray;
  
`
const Left = styled.div`
  display: inline-flex;
  align-items: center;
  
`