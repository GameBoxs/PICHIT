/* ETC Import */
import React from "react"
import styled from "styled-components"

/* Component Import */
import DefaultScreen from "../../component/Interview/DefaultScreen"

const Screen = ({number, info}) => {
    /* 최대 4명 중 참여하지 않은 빈 자리 수 */
    let blankNumber = 3-number;

    /* 나를 제외한 참여자 화면 추가 */
    const allScreen = Array(number).fill(0).map((_, idx) => {
        /* name - index에 해당하는 참여자 이름 */
        let name = JSON.parse(info.subscribers[idx].stream.connection.data).clientData;
        return <DefaultScreen key={idx} streamManager={info.subscribers[idx]} name={name} session={info.mySessionId} isNone={false}/>
    })
    
    /* 빈 자리 수 만큼 검은 화면 추가 */
    const blankScreen = Array(blankNumber).fill(0).map((_, idx) => {
        return <DefaultScreen key={idx} isNone={true} />
    })

    return (
        <FullScreen>
            <DefaultScreen key={info.publisher} streamManager={info.publisher} name={info.myUserName} session={info.mySessionId} number={4}/>
            {number > 0 ? allScreen : null}
            {blankNumber > 0 ? blankScreen : null}
        </FullScreen>
    ) 
}

export default Screen

/* Styled-Component */
const FullScreen = styled.div`
    width: 51vw;
    height: 60vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1vw;
`