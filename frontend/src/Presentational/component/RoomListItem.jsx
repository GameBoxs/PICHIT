import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAxios from "../../action/hooks/useAxios";
import { useSelector } from "react-redux";
import LogInModal from "./LogInModal";

const MySwal = withReactContent(Swal);

function RoomListItem(props) {
  // 비밀방 클릭시, 비밀번호 입력 모달 띄우도록 설정,
  const token = useSelector(state => state.token)
  let navigate = useNavigate();
  const roomId = props.id

  const clickRoomItem = () => {
    if (token === null ){
      MySwal.fire({
        text: "로그인이 필요한 서비스 입니다.",
        showConfirmButton:false,
        icon:'warning',
        timer: 1500
      })
    }
    else{
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
          navigate(`/room/${roomId}`, {
            state: {
              id: props.id,
              password: result.value.password,
            },
          });
        });
      } else {
        navigate(`/room/${roomId}`, {
          state: {
            id: props.id,
          },
        });
      }
    }
  };
  return (
    <RoomItem onClick={clickRoomItem}>
      <div className="rommtitle">
        <h3>
          {props.title}
        </h3>
        <p>
          {props.currentPersonCount}/{props.maxPersonCount}
        </p>
      </div>
      <p>{props.startDate}</p>
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
