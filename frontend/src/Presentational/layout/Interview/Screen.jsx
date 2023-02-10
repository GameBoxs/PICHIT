import React from "react"
import styled from "styled-components"
import DefaultScreen from "../../component/DefaultScreen"

const Screen = ({number, info}) => {
    // 최대 4명 중 빈 참여자 수
    let blankNumber = 3-number;

    const allScreen = Array(number).fill(0).map((_, idx) => {
        let name = JSON.parse(info.subscribers[idx].stream.connection.data).clientData;
        return <DefaultScreen key={idx} streamManager={info.subscribers[idx]} name={name} session={info.mySessionId} isNone={false}/>
    })
    // 참여 하지 않은 사람 자리에 넣을 검은 화면
    const blankScreen = Array(blankNumber).fill(0).map((_, idx) => {
        return <DefaultScreen key={idx} isNone={true} />
    })

    return <FullScreen>
        <DefaultScreen key={info.publisher} streamManager={info.publisher} name={info.myUserName} session={info.mySessionId} number={4}/>
        {number > 0 ? allScreen : null}
        {blankNumber > 0 ? blankScreen : null}
    </FullScreen>
}

export default Screen

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