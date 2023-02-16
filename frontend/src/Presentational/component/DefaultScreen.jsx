/* ETC Import */
import React from "react";
import styled from "styled-components";

/* Component Import */
import { GlobalStyle } from "../../action/GlobalStyle";
import OpenViduVideoComponent from "../component/Chat/OpenVidu/OvVideo";

/* Module Import */
import { selectInterviwee } from "../../action/modules/chatModule";

const DefaultScreen = ({ streamManager, name, session, number, isNone }) => {
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
