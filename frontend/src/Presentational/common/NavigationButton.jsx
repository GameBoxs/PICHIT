import { useRef } from "react";
import styled from "styled-components";
import { GlobalStyle } from "../../action/GlobalStyle";

import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import LogInModal from "../component/LogInModal";
import { useDispatch, useSelector } from "react-redux";
import { slicer } from "../../reducer/tokenSlicer";
import { getUserInfo } from "../../reducer/userStore";

const MySwal = withReactContent(Swal);

function NavigationButton(props) {
  const token = useSelector(state => state.token)
  const info = useSelector(state => state.userinfo)
  const dispatch = useDispatch()
  const menuToggle = useRef();
  
  const toggleClick = () => {
    menuToggle.current.classList.toggle('active');
  }

  const showSwalWithLink = () => {
    MySwal.fire({
      showConfirmButton:false,
      html:(
      <div>
       <LogInModal handleOpenPop={props.handleOpenPop}/>
      </div>
      )
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch(slicer(''))
    dispatch(getUserInfo({
      id: 0,
      name: "",
      email: "",
    }))
    
    window.location.reload()
  }

  return (
    <NavStyle className="navigation" ref={menuToggle} token={token}>
      <GlobalStyle/>
      <NavUser className="userArea">
        <UserName>
          {(token !== null)  ? `${info.name}님 반갑습니다.` : '로그인이 필요합니다.'}
        </UserName>
      </NavUser>
      <MenuToggle className="menuToggle" onClick={toggleClick}></MenuToggle>
      {
        (token !== null) ?
        <MenuList className="menuList">
          <MenuItem>피드백</MenuItem> 
          <MenuItem onClick={logout}>로그아웃</MenuItem> 
        </MenuList>
        :
        <MenuList className="menuList">
          <MenuItem onClick={showSwalWithLink}>Log In</MenuItem>
        </MenuList>
      }
    </NavStyle>
  );
}

export default NavigationButton;

const MenuItem = styled.li`
  list-style: none;
  cursor: pointer;
  display: block;
  height: 70px;
  text-align: center;
  padding-top: 20px;
  &:hover {
    background: var(--primary-dark);
  }
`

const MenuList = styled.ul`
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  height: calc(100% - 60px);
  margin-top: 60px;
  ${MenuItem}{
    &:first-child {
      border-top: 1px solid rgba(0,0,0,0.1);
    }
    border-top: 1px solid rgba(0,0,0,0.1);
  }
  /* border-top: 1px solid rgba(0,0,0,0.1); */
`

const NavUser = styled.div`
  position: relative;
  width: 0px;
  height: 60px;
  background: var(--primary);
  overflow: hidden;
  align-items: center;
  border-radius: 10%;
  transition: 0.5s;
  transition-delay: 0.75s;
  `

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
`

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
    content: '';
    position: absolute;
    width: 32px;
    height: 2px;
    background: var(--white);
    transform: translateY(-10px);
    box-shadow: 0 10px var(--white);
    transition: 0.5s;
  }
  &::after {
    content: '';
    position: absolute;
    width: 32px;
    height: 2px;
    background: var(--white);
    transform: translateY(10px);
    transition: 0.5s;
  }
`

const NavStyle = styled.div`
  z-index: 105;
  position: fixed;
  border-radius: 5%;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: var(--primary);
  box-shadow: 0 25px 35px var(--greyLight-1);
  display: flex;
  justify-content: space-between;
  transition: height 0.5s, width 0.5s;
  transition-delay: 0s, 0.75s;
  overflow: hidden;
  color: var(--white);
  
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
    height: ${props => props.token !== null ? "202px" : "130px"};
    border-radius: 2%;
    transition: width 0.5s, height 0.5s;
    transition-delay: 0s, 0.75s;
  }
`