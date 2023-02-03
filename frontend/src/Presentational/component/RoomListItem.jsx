import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAxios from "../../action/hooks/useAxios";

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
  let navigate = useNavigate();
  const showSwalWithLink = () => {
    MySwal.fire({
      title: "비밀번호 입력",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "입장하기",
      cancelButtonText: "취소하기",
    });
  };

  // const [roomId, setRoomId] =useState([])
  // const clickHandler = () => {
  //   setRoomId(props.id)
  //   console.log(props.id)

  // }

  const clickRoomItem = () => {
    if (props.secretRoom === true) {
      MySwal.fire({
        title: "비밀번호 입력",
        html: `<input type="text" id="password" class="swal2-input" placeholder="password">`,
        confirmButtonText: "입장하기",
        preConfirm: () => {
          const password = Swal.getPopup().querySelector("#password").value;
          if (!password) {
            Swal.showValidationMessage(`Please enter login and password`);
          }
          return { password: password };
        },
      }).then((result) => {
        console.log(result.value.password)
        navigate("/room", {
          state: {
            id: props.id,
            password: result.value.password,
          },
        });
      });
    } else {
      navigate("/room", {
        state: {
          id: props.id,
        },
      });
    }
  };
  return (
    <RoomItem onClick={clickRoomItem}>
      <div className="rommtitle">
        <h3>
          ({props.index}){props.id}
          {props.title}
        </h3>
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
