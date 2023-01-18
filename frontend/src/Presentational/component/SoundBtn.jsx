import React from "react";
import styled from "styled-components";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

//재생 버튼
const SoundBtn = ({ play, isPlaying }) => {
  return (
    <BtnContainer>
      <PlayBtn onClick={play}>
        {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
      </PlayBtn>
    </BtnContainer>
  );
};

export default SoundBtn;

const PlayBtn = styled.div`
  cursor: pointer;
  font-size: 1.5em;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  flex-grow: 1;
`;
