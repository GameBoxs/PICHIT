/* ETC Import */
import { useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { slicer } from "../../reducer/tokenSlicer";
import { setUserInfo } from "../../reducer/userStore";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/* Component Import */
import { GlobalStyle } from "../../action/GlobalStyle";
import LogInModal from "../component/LogInModal";

/* Global Variable */
const MySwal = withReactContent(Swal);

function NavigationButton(props) {
  /*
    navigate - Page 이동에 사용
    location - url path를 찾기 위해 사용
    dispatch - Redux store변경에 사용
    menuToggle - DOM을 참조 하기 위해 사용
    token - 로그인 후 Redux에 저장한 토큰
    info - 로그인 후 Redux에 저장한 내 정보 
  */
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const menuToggle = useRef();
  const token = useSelector((state) => state.token);
  const info = useSelector((state) => state.userinfo);

  /* 메뉴 버튼을 눌렀을 때 toggle을 사용하여 className을 붙임 */
  const toggleClick = () => {
    menuToggle.current.classList.toggle("active");
  };

  /* 소셜 로그인  */
  const showSwalWithLink = () => {
    MySwal.fire({
      showConfirmButton: false,
      html: (
        <div>
          <LogInModal handleOpenPop={props.handleOpenPop} />
        </div>
      ),
    });
  };

  /* 로그아웃 */
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(slicer(""));
    dispatch(
      setUserInfo({
        id: 0,
        name: "",
        email: "",
      })
    );

    menuToggle.current.classList.toggle("active");
    window.location.reload();
    navigate("/");
  };

  /* Page 이동 */
  const movePage = () => {
    navigate("/review");
    menuToggle.current.classList.toggle("active");
  };

  /* MainPage로 이동 */
  const moveMain = () => {
    navigate("/");
    menuToggle.current.classList.toggle("active");
  };

  /* 조건에 따른 높이 변경 */
  const NavHeight =
    token !== null
      ? location.pathname === "/"
        ? 202
        : location.pathname === "/review"
        ? 202
        : 274
      : 130;

  return (
    <NavStyle className="navigation" ref={menuToggle} NavHeight={NavHeight}>
      <GlobalStyle />
      <NavUser className="userArea">
        <UserName>
          {token !== null
            ? `${info.name}님 반갑습니다.`
            : "로그인이 필요합니다."}
        </UserName>
      </NavUser>
      <MenuToggle className="menuToggle" onClick={toggleClick}></MenuToggle>
      {token !== null ? (
        <MenuList className="menuList">
          {location.pathname === "/" ? null : (
            <MenuItem onClick={moveMain}>홈으로</MenuItem>
          )}
          {location.pathname === "/review" ? null : (
            <MenuItem onClick={movePage}>피드백</MenuItem>
          )}
          <MenuItem onClick={logout}>로그아웃</MenuItem>
        </MenuList>
      ) : (
        <MenuList className="menuList">
          <MenuItem onClick={showSwalWithLink}>Log In</MenuItem>
        </MenuList>
      )}
    </NavStyle>
  );
}

export default NavigationButton;

/* Styled-Component */
const MenuItem = styled.li`
  list-style: none;
  cursor: pointer;
  display: block;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);

  &:hover {
    background: var(--primary-dark);
    color: var(--greyLight-1);
  }
`;

const MenuList = styled.ul`
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  height: calc(100% - 60px);
  margin-top: 60px;
  ${MenuItem} {
    &:first-child {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const NavUser = styled.div`
  position: relative;
  width: 0px;
  height: 60px;
  background: var(--primary);
  overflow: hidden;
  align-items: center;
  border-radius: 10%;
  transition: 0.2s;
  transition-delay: 0.4s;
`;

const UserName = styled.span`
  border-radius: 20%;
  white-space: nowrap;
  color: var(--white);
  font-size: 1.1em;
  transition: 0.5s;
  display: table-cell;
  line-height: 60px;
  width: 240px;
  text-align: center;
`;

const MenuToggle = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  background: var(--primary);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10%;

  &::before {
    content: "";
    position: absolute;
    width: 32px;
    height: 2px;
    background: var(--white);
    transform: translateY(-10px);
    box-shadow: 0 10px var(--white);
    transition: 0.2s;
  }

  &::after {
    content: "";
    position: absolute;
    width: 32px;
    height: 2px;
    background: var(--white);
    transform: translateY(10px);
    transition: 0.2s;
  }
`;

const NavStyle = styled.div`
  z-index: 105;
  position: fixed;
  border-radius: 5%;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: var(--primary);
  box-shadow: 0 25px 35px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  transition: height 0.5s, width 0.5s;
  transition-delay: 0s, 0.75s;
  overflow: hidden;
  color: var(--white);
  border: var(--white) solid 1px;

  &.active {
    ${MenuToggle} {
      &::before {
        transform: translateY(0px) rotate(45deg);
        box-shadow: 0 0px var(--greyLight-1);
      }
      &::after {
        transform: translateY(0px) rotate(-45deg);
      }
    }

    ${NavUser} {
      width: calc(100% - 60px);
      border-radius: 10%;
    }

    width: 300px;
    height: ${(props) => props.NavHeight}px;
    border-radius: 2%;
    transition: width 0.5s, height 0.5s;
    transition-delay: 0s, 0.75s;
  }
`;
