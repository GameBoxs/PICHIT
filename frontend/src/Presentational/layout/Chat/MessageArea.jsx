/* ETC Import */
import { useEffect, useRef } from "react";
import styled from "styled-components";

/* Component Import */
import IncomMessage from "../../component/Chat/IncomMessage";

const MessageArea = ({Message}) => {
    /* 메세지 영역 Dom 담을 Ref */
    const scrollRef = useRef();

    /* 메세지 수신하면 메세지 스크롤 가장 아래로 변경 */
    const scrollToBottom = () => {
        if(scrollRef.current){
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    /* Message 변경 감지 */
    useEffect(() => {
        /* 스크롤을 가장 하단으로 옮기는 함수 실행 */
        scrollToBottom();
    },[Message]);

    return (
        <MessageWrap ref={scrollRef}>
            {
                Message.map((data,index) => {
                    return(
                        <IncomMessage data={data} key={index}/>
                    )
                })
            }
        </MessageWrap>
    )
}

export default MessageArea;

/* Styled-Component */
const MessageWrap = styled.div`
    width: inherit;
    height: 100%;
    padding-inline: 0;
    overflow: auto;
    & *{
        margin: 0px 0 5px 0;
    }

    & :first-child, :last-child{
        margin:0;
    }

    &::-webkit-scrollbar {
        width: 7px;
        border-radius: 1rem;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--greyLight-2);
        border-radius: 1rem;
    }

    &::-webkit-scrollbar-track {
        background-color: var(--greyLight-1);
    }
`