import React from "react"
import styled from "styled-components"
import DefaultScreen from "../../component/DefaultScreen"

const Screen = ({number}) => {
    const allScreen = Array(number).fill(0).map((_, idx) => {
        return <DefaultScreen key={idx} />
    })

    return <FullScreen>
        {allScreen}
    </FullScreen>
}

export default Screen

const FullScreen = styled.div`
    width: 51vw;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1vw;
`