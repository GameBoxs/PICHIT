import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import styled, { css } from "styled-components";

function PageZero() {
  const pages = [1];
  return (
    <EmptyPageBar>
      <GrFormPrevious className={"Head"} />
      <Bar className="paginationBar">
        {pages.map((page, index) => {
          return (
            <Button
              key={index}
              active={true}
            ></Button>
          );
        })}
      </Bar>
      <GrFormNext className={"Tail"} />
    </EmptyPageBar>
  );
}

export default PageZero;
const Bar = styled.div`
  /* border: solid 2px skyblue; //pagination영역을 위한 border: ; */
  width: 250px;
  height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 1em;
  margin-right: 20px;
  border: none;
  background-color: var(--primary);
  cursor: pointer;
  transition: 0.3s ease width;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background: var(--primary-dark);
    cursor: pointer;
  }

  ${(props) =>
    props.active &&
    css`
      width: 50px !important;
      cursor: auto;
    `};
`;

const EmptyPageBar = styled.div`
  display: flex;
  align-items: center;

  .Head {
    font-size: 50px;
    polyline {
      stroke: #b6b6b6;
    }
  }
  .Tail {
    font-size: 50px;
    polyline {
      stroke: #b6b6b6;
    }
  }
`;
