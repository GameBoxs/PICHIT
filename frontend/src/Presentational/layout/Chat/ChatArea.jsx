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
    let bounceFlag = false;

    useEffect(() => {
        let mySession = session;
        if (mySession !== null){
            mySession.on('signal:all-chat',(e) => {
                setT(JSON.parse(e.data));
                bounceFlag = false;
            })
            mySession.on('signal:who-typing',(e) => {
                console.log(e);
                console.log(session);
                if(e.data !== '' && session.connection.connectionId !== e.from){
                    bounceFlag = true;
                }
                setTimeout(() => {
                    bounceFlag = false;
                },60000)
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
                {
                    bounceFlag ?
                    <BounceText />
                    :null
                }
            </ChatBody>
            <InputBody>
                {/* <InputArea SetIncomMessage={SetIncomMessage} session={session}/> */}
                <InputArea session={session} info={info}/>
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
    margin-top: 2%;
    padding: 0 3% 7% 5% ;
    width: calc(100%-10px);
    height: 90%;
    overflow: auto;
    
    &::-webkit-scrollbar {
        display: none;
    }
`
const InputBody = styled.div`
    padding-inline: 1.5vw;
    width: calc(100%-10px);
    height: 8%;
`

export default memo(ChatArea);