import styled from "styled-components";


const Button = ({ text, handler, isImportant }) => {
  return (
    <Btn onClick={handler} isImportant={isImportant} className="Btn">
      <BtnText>{text}</BtnText>
    </Btn>
  );
};

export default Button;

const BtnText = styled.p`
  display: flex;
  text-align: center;
  font-size: 120%;
`;

const Btn = styled.div`
  width: 10vw;
  height: 8vh;
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2),
    -0.2rem -0.2rem 0.5rem var(--white);
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;
  font-weight: 600;
  grid-column: 1 / 2;
  grid-row: ${(props) => (props.isImportant ? "4 / 5" : "1 / 2")};
  background-color: ${(props) =>
    props.isImportant ? "var(--primary)" : "var(--greyLight-1)"};
  box-shadow: ${(props) =>
    props.isImportant
      ? "inset 0.2rem 0.2rem 1rem var(--primary-light), inset -0.2rem -0.2rem 1rem var(--primary-dark), 0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white)"
      : "null"};

  & ${BtnText} {
    color: ${(props) =>
      props.isImportant ? "var(--greyLight-1)" : "var(--greyDark)"};
  }

  &:hover ${BtnText} {
    color: ${(props) =>
      props.isImportant ? "var(--white)" : "var(--primary)"};
  }

  &:active {
    box-shadow: ${(props) =>
      props.isImportant
        ? "inset 0.2rem 0.2rem 1rem var(--primary-dark),inset -0.2rem -0.2rem 1rem var(--primary-light)"
        : "inset .2rem .2rem .5rem var(--greyLight-2), inset -.2rem -.2rem .5rem var(--white)"};
  }
`;
