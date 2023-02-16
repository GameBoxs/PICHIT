import React from "react";
import styled from "styled-components";
import RoomListBox from "../../component/MainBoard/RoomListBox";
import Loading from "../../common/Loading";

//보드 리스트 판별
function BoardList(props) {
  const { data, aboutCondition, roomPosition } = props;

  return (
    <RoomListdiv>
      {data ? (
        <RoomListBox
          aboutCondition={aboutCondition}
          roomsData={data}
          roomPosition={roomPosition}
        />
      ) : (
        <Loading />
      )}
    </RoomListdiv>
  );
}

export default BoardList;

const RoomListdiv = styled.div`
  margin-block: 1rem 3rem;
  height: 30rem;
`;
