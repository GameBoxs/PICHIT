import { memo, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import BounceText from "../../component/Chat/BounceText";

import InputArea from "./InputArea";
import MessageArea from "./MessageArea";

/*
    MessageArea에서 스크롤바 없애기
*/

const ChatArea = ({session,info}) => {
    const [incomM, SetIncomM] = useState([]);
    const [tD, setT] = useState();
    const [flag,setFlag] = useState(false);

    useEffect(() => {
        let mySession = session;
        if (mySession !== null){
            mySession.on('signal:all-chat',(e) => {
                setT(JSON.parse(e.data));
                // SetIncomMessage(JSON.parse(e.data));
                // let data = JSON.parse(e.data);
                // let temp = [...IncomM];
                // temp.push(data);
                // SetIncomM(temp);
            })
        }
    },[session])

    useEffect(() => {
        if(flag === false)
            setFlag(true);
        else{
            SetIncomMessage(tD);
        }
    },[tD])

    const SetIncomMessage = (data) => {
        let temp = [...incomM];
        temp.push(data);
        SetIncomM(temp);
    }

    return(
        <ChatWrap>
            <ChatBody>
                <MessageArea Message={incomM}/>
                {/* <MessageArea session={session}/> */}
                <BounceText />
            </ChatBody>
            <InputBody>
                {/* <InputArea SetIncomMessage={SetIncomMessage} session={session}/> */}
                <InputArea session={session}/>
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

export default memo(ChatArea);