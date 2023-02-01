import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// {
//     "id": 80,
//     "title": "멋진 면접",
//     "currentPersonCount": 1,
//     "maxPersonCount": 4,
//     "secretRoom": true,
//     "finished": false,
//     "startDate": "2023-01-24T08:40:10.495"
// }
function RoomListItem(props) {
    // 비밀방 클릭시, 비밀번호 입력 모달 띄우도록 설정,
  const showSwalWithLink = () => {
    MySwal.fire({
      title: "비밀번호 입력",
      input:'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton:true,
      confirmButtonText:"입장하기",
      cancelButtonText:"취소하기"
    });
  };

  // const [roomId, setRoomId] =useState([])
  // const clickHandler = () => {
  //   setRoomId(props.id)
  //   console.log(props.id)

  // }
  return (
    
    <RoomItem>
      <div className="rommtitle">
      <Link to ="/room" state={{ roomId:props.id}}>
        <h3>({props.index}){props.id}{props.title}</h3>
      </Link>
        <p>
          {props.currentPersonCount}/{props.maxPersonCount}
        </p>
      </div>
      <p>{props.startDate}</p>

      {props.secret ? (
        <button onClick={showSwalWithLink}>비밀번호</button>
      ) : null}
      {/* secret:true 일 때 일단 임시로 비밀번호 버튼 뜨도록 설정 */}
    </RoomItem>
  );
}

export default RoomListItem;

const RoomItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* border: 1px solid black; */
  border-radius: 15px;
  width: 32%;
  height: 140px;
  padding: 2% 4%;
  margin-bottom: 2%;
	box-shadow: 4px 4px 12px 1px rgba(0, 0, 0, 0.2);
  div {
    display: flex;
    justify-content: space-between;
    /* margin: 0px 5px; */
  }
  p {
    display: flex;
    flex-direction: row-reverse;
  }
`;
