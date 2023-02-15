/* ETC Import */
import { memo, useEffect,useState } from "react";
import styled from "styled-components";

/* Component Import */
import BounceText from "../../component/Chat/BounceText";
import InputArea from "./InputArea";
import MessageArea from "./MessageArea";

const ChatArea = ({session,info, chatOn}) => {
    /* 수신 메세지 저장 */
    const [incomM, SetIncomM] = useState([]);
    /* 단일 수신 메세지 임시로 저장 */
    const [tD, setT] = useState();
    /* 메세지 입력중 이라는 신호 수신 Flag */
    const [flag,setFlag] = useState(false);
    /* 메세지 입력중 이라는 신호 수신시 ... 띄울 Flag */
    const [bounceFlag, setBounceFlag] = useState(false);

    /* 단일 수신 메세지를 메세지 리스트에 저장 */
    const SetIncomMessage = (data) => {
        let temp = [...incomM];
        temp.push(data);
        SetIncomM(temp);
    }

    /* session 변경 감지 */
    useEffect(() => {
        let mySession = session;
        if (mySession !== null){
            /* 메세지를 받았을 때 */
            mySession.on('signal:all-chat',(e) => {
                /* 받은 데이터를 JSON 객체로 변환하여 메세지 저장 */
                setT(JSON.parse(e.data));
                /* 메세지를 받았으므로 ... 없어지도록 Flag false */
                setBounceFlag(false);
            })
            /* 누군가 채팅창 타이핑 중 이라는 신호 받았을 때 */
            mySession.on('signal:who-typing',(e) => { 
                /* 내가 입력중일때 뜨면 안되므로 다른 사람이 입력중일때를 검사 */
                if(e.data !== '' && session.connection.connectionId !== e.from.connectionId){
                    setBounceFlag(true);
                }
                /* 혹시나 입력 해놓고 오랫동안 보내지 않으면 1분 뒤에 ...없앰 */
                setTimeout(() => {
                    setBounceFlag(false);
                },60000)
            })
        }
    },[session])

    /* tD변경 감지 */
    useEffect(() => {
        if(flag === false) {
            setFlag(true);
        }
        else {
            SetIncomMessage(tD);
        }
    },[tD])

    return(
        <ChatWrap chatOn={chatOn} className="ChatWrap">
            <ChatBody>
                <MessageArea Message={incomM}/>
                {
                    bounceFlag ?
                    <BounceText />
                    :null
                }
            </ChatBody>
            <InputBody>
                <InputArea session={session} info={info}/>
            </InputBody>
        </ChatWrap>
    )
}

export default memo(ChatArea);

/* Styled-Component */
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