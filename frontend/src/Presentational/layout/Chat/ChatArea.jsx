import { useState } from "react";
import styled from "styled-components";
import BounceText from "../../component/Chat/BounceText";

import InputArea from "./InputArea";
import MessageArea from "./MessageArea";

/*
    MessageArea에서 스크롤바 없애기
*/

const ChatArea = () => {
    let [IncomM, SetIncomM] = useState([]);
    
    function SetIncomMessage(data) {
        let temp = [...IncomM];
        temp.push(data);
        SetIncomM(temp);
        console.log(temp);
        console.log('SetIncomMessage Start');
    }


    return(
        <ChatWrap>
            <ChatBody>
                <MessageArea Message={IncomM}/>
                <BounceText />
            </ChatBody>
            <InputBody>
                <InputArea SetIncomMessage={SetIncomMessage}/>
            </InputBody>
        </ChatWrap>
    )
}

const ChatWrap = styled.div`
    width: 100%;
    height: calc(100% - 31px);
    border-radius: 0;
`
const ChatBody = styled.div`
    margin-top: 10px;
    padding: 10px;
    background-color: #79c7c42b;
    width: calc(100%-10px);
    height: 91%;
    overflow: auto;
`
const InputBody = styled.div`
    padding-inline: 1.5vw;
    width: calc(100%-10px);
    height: 8%;
`

export default ChatArea;