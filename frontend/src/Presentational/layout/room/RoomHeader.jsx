import styled from "styled-components";
import Title from "../../common/Title"
import PlanTime from "../../component/PlanTime"
import React from "react";

function RoomHeader(props) {

  const joinHandler = () => {
    props.joinRoom(!props.join)
  }

    return (
        <>
        <Layout>
          <Left>
            <Title title={props.title} />
            <PlanTime date={props.date} />
          </Left>
          <button onClick={joinHandler}>참여하기</button>
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
