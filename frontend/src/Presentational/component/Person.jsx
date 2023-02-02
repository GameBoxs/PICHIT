import React from "react";
import styled from "styled-components";
import _ from "lodash";
import {MdPersonPin} from "react-icons/md"

function Person({ name, isHost, people }) {
  return (
    <PersonContainer people={people}>
      <Background isHost={isHost}>
        <MdPersonPin />
      </Background>
      <Name>{name}</Name>
    </PersonContainer>
  );
}

export default Person;

const Name = styled.div``;

const Background = styled.div`
position: relative;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;

  & *{
    width: inherit;
    height: inherit;
    position: absolute;
    bottom: 0;
    color: ${(props) => props.isHost? "var(--primary)" : "var(--greyDark)"};
  }
`;

const PersonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props => `calc(100%/${props.people})`};
  gap: 1rem;
`;