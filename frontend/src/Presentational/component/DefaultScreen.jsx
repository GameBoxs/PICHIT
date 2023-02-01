import React, { useState } from "react";
import styled from "styled-components";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";

// OpenVidu 관련 Import
import OpenViduVideoComponent from "../component/Chat/OpenVidu/OvVideo";
import { selectInterviwee } from "../../action/modules/chatModule";
import { useDispatch } from "react-redux";
import { GlobalStyle } from "../../action/GlobalStyle";

const DefaultScreen = ({ streamManager, name, session, number, isNone }) => {
  let dispatch = useDispatch();

  const [isCamOn, setIsCamOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  return (
    <ScreenContainer
      className="ScreenChild"
      onClick={() => {
        selectInterviwee(streamManager.stream.connection.connectionId, session);
      }}
      number={number}
      isNone={isNone}
    >
      <GlobalStyle />
      <NameTag>{name !== null && name !== undefined ? name : null}</NameTag>
      {streamManager !== null ? (
        <OpenViduVideoComponent streamManager={streamManager} />
      ) : null}
      {/* <Submenu>
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
      </Submenu> */}
    </ScreenContainer>
  );
};

export default DefaultScreen;

const NameTag = styled.div`
  position: absolute;
  display: flex;
  top: 1vh;
  left: 0.5vw;
  background: var(--greyLight-1);
  color: var(--greyDark);
  padding: 1% 2%;
  border-radius: 0.5em;
  justify-self: center;
`;

const Icon = styled.div``;

const Submenu = styled.div`
  position: absolute;
  width: 12vw;
  height: 5vh;
  top: 23vh;
  left: 45%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 1em;
  gap: 0.5em;
`;

const ScreenContainer = styled.div`
  display: ${(props) => (props.isNone ? "none" : "inline-block")};
  position: relative;
  background-color: black;
  color: white;
  border-radius: 1em;
  overflow: hidden;
  width: 25vw;
  height: 29vh;
  text-align: center;
  box-shadow:0.8rem 0.8rem 1.4rem var(--greyLight-2), -0.2rem -0.2rem 1.8rem var(--white);

  & video {
    object-fit: cover !important;
    width: 100%;
    height: 100%;
  }
`;
