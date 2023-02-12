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
  const token = useSelector((state) => state.token);
  let navigate = useNavigate();
  const roomId = props.id;

  const clickRoomItem = () => {
    if (token === null) {
      MySwal.fire({
        text: "로그인이 필요한 서비스 입니다.",
        showConfirmButton: false,
        icon: "warning",
        timer: 1500,
      });
    } else {
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
          console.log(result.value.password);
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
      <RoomContent className="rommtitle">
        <RoomTitle>{props.title}</RoomTitle>
        <RoomInfo>
          {props.currentPersonCount}/{props.maxPersonCount}
        </RoomInfo>
      </RoomContent>
      <RoomInfo>{props.startDate}</RoomInfo>
    </RoomItem>
  );
}

export default RoomListItem;

const RoomItem = styled.li`
  width: 32%;
  height: 140px;
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2),
    -0.2rem -0.2rem 0.5rem var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;
  font-weight: 600;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  background-color: var(--greyLight-1);
  color: var(--greyDark);
  padding: 1rem;
  gap: 1rem;

  .roomtitle {
    display: flex;
    justify-content: space-between;
    /* margin: 0px 5px; */
  }
  p {
    display: flex;
    flex-direction: row-reverse;
  }
  font-family: "SBAggroL";
`;

const RoomContent = styled.div`
width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 1rem;
`;

const RoomTitle = styled.div`
  font-size: 1.2rem;
  color: var(--greyDark);
`;

const RoomInfo = styled.p`
  font-size: 0.8rem;
`;
