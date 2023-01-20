import { useState } from "react";
import styled from "styled-components";

import PasswordModal from './PasswordModal'

function RoomListItem(props) {
    //비밀번호 모달(시도까지만)
    const [passwordModal, setPasswordModal] = useState(false);
    function passwordHandler() {
        if(passwordModal===false){
            setPasswordModal(true); 
        }
        else{
            setPasswordModal(false); 
        }
    }

    return(
        <RoomItem>
            <div className="rommtitle">
                <h3>{props.title}</h3>
                <p>{props.Participant}/{props.personnel}</p>
            </div>
            <p>{props.date}</p>
            {/* <button onClick={passwordHandler}>비밀번호</button> */}
            {passwordModal ? <PasswordModal />:null}
        </RoomItem>
    )
}

export default RoomListItem;


const RoomItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid black;
  border-radius: 15px;
  width: 32%;
  height: 140px;
  padding: 2% 3%;
  margin-bottom:2%;
  div{
    display: flex;
    justify-content: space-between;
    /* margin: 0px 5px; */
  }
  p{
    display: flex;
    flex-direction: row-reverse
  }
`;
