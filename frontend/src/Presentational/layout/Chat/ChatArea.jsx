import { memo, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import BounceText from "../../component/Chat/BounceText";

import InputArea from "./InputArea";
import MessageArea from "./MessageArea";

/*
    MessageArea에서 스크롤바 없애기
*/

const ChatArea = ({session,info, chatOn}) => {
    const [incomM, SetIncomM] = useState([]);
    const [tD, setT] = useState();
    const [flag,setFlag] = useState(false);
    const [bounceFlag, setBounceFlag] = useState(false); // 입력 신호 올대 ... 띄우는 Flag

    useEffect(() => {
        let mySession = session;
        if (mySession !== null){
            mySession.on('signal:all-chat',(e) => {
                setT(JSON.parse(e.data));
                setBounceFlag(false);
            })
            mySession.on('signal:who-typing',(e) => { // 누군가 타이핑 입력중이라는것 신호 받기
                // console.log('e가 뭐야 ',e);
                // console.log('e 세션은 또 뭐고 ', session);
                // 내가 입력중일때 뜨면 안되므로 다른 사람이 입력중일때를 검사
                if(e.data !== '' && session.connection.connectionId !== e.from.connectionId){
                    setBounceFlag(true);
                }
                // 혹시나 입력 해놓고 오랫동안 보내지 않으면 2분 뒤에 ...없앰
                setTimeout(() => {
                    setBounceFlag(false);
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
        <ChatWrap chatOn={chatOn} className="ChatWrap">
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
    visibility: ${props => props.chatOn ? 'visible':'hidden'};
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

    *{
        border-radius: 0 !important;
    }
`
const InputBody = styled.div`
    padding-inline: 1.5vw;
    width: calc(100%-10px);
    height: 8%;
`

export default memo(ChatArea);