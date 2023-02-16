import { useState } from "react";
import styled from "styled-components";
//sweetalert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function TitleSection(props) {
  const isUser = props.token;
  const [isChecked, setIsChecked] = useState(true);

  function switchHandler(e) {
    props.roomSwitch(e);
    setIsChecked(e === "toTotal" ? true : false);
  }

  //비로그인 사용자가 MY 클릭시
  function needLogin() {
    MySwal.fire({
      text: "로그인이 필요한 서비스 입니다.",
      showConfirmButton: false,
      icon: "warning",
      timer: 1500,
    });
  }
  return (
    <Titlesection isChecked={isChecked}>
      <TitleBody>
        <h1>면접방</h1>
        <p>
          {props.roomPosition
            ? "내가 참여한 방만 볼 수 있습니다."
            : "모든방을 볼 수 있습니다."}
        </p>
      </TitleBody>
      <div>
        <button
          onClick={() => {
            switchHandler("toTotal");
          }}
        >
          모든
          <br />
          면접방
        </button>
        <button
          onClick={() => {
            if (isUser) {
              switchHandler("toMy");
            } else {
              needLogin();
            }
          }}
        >
          나의
          <br />
          면접방
        </button>
      </div>
    </Titlesection>
  );
}

export default TitleSection;

const TitleBody = styled.div`
  h1 {
    font-size: 3rem;
  }
`;

const Titlesection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "SBAggroL";
  margin: 0px 25px;

  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  div button {
    color: var(--white);
    width: 4rem;
    height: 4rem;
    border: none;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
  }

  div button:first-child {
    cursor: pointer;
    background-color: ${props => props.isChecked?`var(--primary-light)`:`var(--greyLight-3)`};
  }

  div button:last-child {
    cursor: pointer;
    background-color: ${props => !props.isChecked?`var(--primary-light)`:`var(--greyLight-3)`};
  }
`;
