import React, { useState } from "react";
import styled from "styled-components";
import {
  BsFillMicFill,
  BsFillMicMuteFill,
} from "react-icons/bs";
import {
    IoVideocam,
    IoVideocamOff
} from "react-icons/io5"

const DefaultScreen = () => {
  const [isCamOn, setIsCamOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  return (
    <ScreenContainer>
      HIHIHI
      <Submenu>
        <Icon
          onClick={() => {
            setIsCamOn(!isCamOn);
          }}
        >
          {isCamOn ? <IoVideocam /> : <IoVideocamOff />}
        </Icon>
        <Icon
          onClick={() => {
            setIsMicOn(!isMicOn);
          }}
        >
          {isMicOn ? <BsFillMicFill /> : <BsFillMicMuteFill />}
        </Icon>
      </Submenu>
    </ScreenContainer>
  );
};

export default DefaultScreen;

const Icon = styled.div``;

const Submenu = styled.div`
  position: relative;
  width: 12vw;
  height: 5vh;
  top: 20vh;
  left: 45%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.3em;
  gap: 0.8em;
`;

const ScreenContainer = styled.div`
  background-color: black;
  color: white;
  border-radius: 1em;
  overflow: hidden;
  width: 25vw;
  height: 30vh;
  text-align: center;
`;
