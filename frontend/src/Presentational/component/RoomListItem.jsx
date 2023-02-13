import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { FaLock } from "react-icons/fa";

const MySwal = withReactContent(Swal);

function RoomListItem(props) {
  const { data, index } = props;
  const {
    id,
    secretRoom,
    title,
    currentPersonCount,
    maxPersonCount,
    startDate,
  } = data;
  // 비밀방 클릭시, 비밀번호 입력 모달 띄우도록 설정,
  const token = useSelector((state) => state.token);
  let navigate = useNavigate();
  const roomId = id;

  const clickRoomItem = () => {
    if (token === null) {
      MySwal.fire({
        text: "로그인이 필요한 서비스 입니다.",
        showConfirmButton: false,
        icon: "warning",
        timer: 1500,
      });
    } else {
      if (secretRoom === true) {
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
          navigate(`/room/${roomId}`, {
            state: {
              id: id,
              password: result.value.password,
            },
          });
        });
      } else {
        navigate(`/room/${roomId}`, {
          state: {
            id: id,
          },
        });
      }
    }
  };
  return (
    <RoomItem onClick={clickRoomItem}>
      <RoomInfo>No.{id}</RoomInfo>
      <RoomContent className="rommtitle">
        <RoomTitle>
          {title}
          {secretRoom ? <FaLock /> : null}
        </RoomTitle>
        <RoomInfo>
          {currentPersonCount}/{maxPersonCount}
        </RoomInfo>
      </RoomContent>
      <RoomInfo>{startDate.slice(0, 10).split("-").join(".")}</RoomInfo>
    </RoomItem>
  );
}

export default RoomListItem;

const RoomInfo = styled.p`
  font-size: 0.8rem;
`;

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
  gap: 0.5rem;
  font-family: "SBAggroL";

  .roomtitle {
    display: flex;
    justify-content: space-between;
    /* margin: 0px 5px; */
  }

  p {
    display: flex;
    flex-direction: row-reverse;
  }

  & ${RoomInfo}:first-child {
    color: var(--greyLight-3);
  }
`;

const RoomContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${RoomInfo} {
    color: var(--greyLight-3);
  }
`;

const RoomTitle = styled.div`
  font-size: 1.2rem;
  color: var(--primary);
  display: flex;
  gap: 0.5rem;
  align-items: center;

  path {
    color: var(--primary);
  }
`;
