import React from "react";
import styled from "styled-components";

//재생 버튼
const SoundBtn = ({play, isPlaying}) => {
    return <BtnContainer>
        <PlayBtn onClick={play} isStop={isPlaying}>HIHI</PlayBtn>
    </BtnContainer>
}

export default SoundBtn

const PlayBtn = styled.div`
    cursor: pointer;
`

const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    flex-grow: 1;
`