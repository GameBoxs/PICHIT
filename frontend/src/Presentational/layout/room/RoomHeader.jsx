import styled from "styled-components";
import Title from "../../common/Title"
import PlanTime from "../../component/PlanTime"
import React,{useState} from "react";
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import EditRoom from "../../component/EditRoom";



const MySwal =withReactContent(Swal);

function RoomHeader({join,joinRoom,title,date,host}) {
  
  const showSwalWithLink =() => {
    MySwal.fire({
      html:(
        <div>
          <EditRoom />
        </div>
      )
    })
  }
  

  const joinHandler = () => {
    joinRoom(!join)
  }




    return (
        <>
        <Layout>
          <Left>
            <Title title={title} />
            <PlanTime date={date} />
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
