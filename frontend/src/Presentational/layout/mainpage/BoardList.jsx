import React from "react";
import styled from "styled-components";
import RoomListBox from "../../component/RoomListBox";

function BoardList(props) {
    const {data, aboutCondition, roomPosition} = props

  return (
    <RoomListdiv>
      {data ? (
        <RoomListBox
          aboutCondition={aboutCondition}
          roomsData={data}
          roomPosition={roomPosition}
        />
      ) : (
        <div>loading...</div>
      )}
    </RoomListdiv>
  );
}

export default BoardList;

const RoomListdiv = styled.div`
  margin-block: 1rem 3rem;
  height: 30rem;
`;
