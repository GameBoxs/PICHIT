import styled from "styled-components";

export const SubBtn = styled.div`
  padding: 0.5em 1.2em;
  font-size: 0.8em;
  width: fit-content;
  border-radius: 1rem;
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;
  font-weight: 600;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  background-color: var(--primary);
  box-shadow: inset 0.1rem 0.1rem 0.5rem var(--primary-light),
    inset -0.1rem -0.1rem 0.5rem var(--primary-dark),
    0.15rem 0.15rem 0.3rem var(--greyLight-2),
    -0.1rem -0.1rem 0.25rem var(--white);

  color: var(--greyLight-1);

  &:hover {
    color: var(--white);
  }

  &:active {
    box-shadow: inset 0.2rem 0.2rem 1rem var(--primary-dark),
      inset -0.2rem -0.2rem 1rem var(--primary-light);
  }
`;

export const QuestionBody = styled.div`
  background-color: white;
  padding-block: 2vh;
  padding-inline: 1.5vw;
`;

export const SubNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BodyCompo = styled.div`
  --mini-compo: 8vh;
  position: relative;
  height: 84vh;

  &:nth-child(1) {
    margin: 1.5vh 0.5vw 1.5vh 1vw;
    display: grid;
    grid-template-rows: 2fr 7fr;
    gap: 0.5vw;
  }

  &:nth-child(2) {
    display: grid;
    grid-template-rows: 5fr var(--mini-compo) 7fr;
    gap: 0.5vw;
    margin: 0vh 0.5vw 0vh 0vw;

    div {
      border-radius: 2vw;
    }

    ${QuestionBody}:nth-child(1) {
      display: grid;
      grid-template-rows: 1fr 2fr 1fr;
      background-color: var(--white);
    }
  }

  &:nth-child(3) {
    display: grid;
    grid-template-rows: var(--mini-compo) ${(props) =>
        props.chatOn ? "37vh 37vh" : "66vh var(--mini-compo)"};
    transition: 0.5s ease-in-out;
    gap: 0.5vw;
    margin: 0vh 1vw 0vh 0vw;

    * {
      border-radius: 2vw;
    }

    ${SubNav} {
      display: block;
    }

    ${QuestionBody} .SubTitle:last-child {
      margin-top: 0.5vh;
    }

    ${QuestionBody} textarea {
      padding: 0.5rem 1.4rem;
    }

    & ${QuestionBody}:last-child {
      padding-top: 0;

      .ChatTitle {
        padding-top: 2.5vh;
        color: var(--greyLight-3);
      }

      .ChatWrap{
        height: 80%;
      }
    }
  }

  &:nth-child(2) ${QuestionBody}:nth-child(2), &:nth-child(3) ${QuestionBody}:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .SubTitle {
    color: var(--greyLight-3) !important;
    font-weight: normal !important;
  }
`;

export const CamCompo = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover !important;

  div div {
    height: 100%;
    width: inherit;
  }

  & video {
    object-fit: cover !important;
    width: inherit;
    height: 100%;
  }
`;
