import styled from "styled-components";
import RoomHeader from "../layout/room/RoomHeader";
import RoomMain from "../layout/room/RoomMain";
import React, { useState, useEffect } from "react";

function RoomPage(props) {
  const [join, setJoin] = useState(false);

  useEffect(()=>{console.log("inRoomPage", join)}, [join])

  const joinRoom = (join) => {
    setJoin(join);
    console.log(join);
  };

  return (
    <>
      <Page>
        <RoomHeader
          title={props.items[0].title}
          date={props.items[0].date}
          joinRoom={joinRoom}
          join={join}
        />
        <RoomMain
          people={props.items[0].people}
          content={props.items[0].content}
          join={join}
        />
      </Page>
    </>
  );
}
export default RoomPage;

const Page = styled.div`
  margin-left: 10%;
  margin-right: 10%;
`;
