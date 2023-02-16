import styled from "styled-components";
import Title from "../../../common/Title";
import SubTitle from "../../../common/SubTitle";

import { AiFillRightCircle } from "react-icons/ai";

// 각 면접방 항목
const ListItem = (props) => {
  // 면접방 일자
  const tempDate =
    props.startedTime !== undefined
      ? new Date(props.startedTime.toString())
      : null;

  // 출력을 위한 string으로 변경
  const date =
    tempDate !== null
      ? tempDate.getFullYear().toString().slice(2, 4) +
        "년\t" +
        (tempDate.getMonth() + 1).toString() +
        "월\t" +
        tempDate.getDate().toString() +
        "일\t"
      : null;

  //다른 항목 선택할 때마다 selectedID 바뀌도록
  const changeID = () => {
    if (props.startedTime !== undefined) {
      props.setSelectedID(props.myID);
    }
  };

  //idx 값이 10보다 작을 경우 앞에 0 추가
  const idx =
    props.index < 10 ? "0" + (props.index + 1).toString() : props.index;

  return (
    <>
      <ItemWrap
        onClick={changeID}
        cursor={props.cursor}
        isBlank={idx === undefined ? true : false}
      >
        {/* idx */}
        <div>{idx}</div>

        {/* 제목 */}
        {props.item && props.item.title ? (
          <Title title={props.item.title} />
        ) : (
          <Title title="" />
        )}

        {/* 스터디 일시 */}
        {props.item && props.item.title ? (
          <SubTitle title={date}></SubTitle>
        ) : (
          <SubTitle title=""></SubTitle>
        )}

        {/* 이동하기 버튼 */}
        {props.item.title !== "" &&
        props.item.title !== null &&
        props.item.title !== undefined ? (
          <AiFillRightCircle />
        ) : null}
      </ItemWrap>
    </>
  );
};

const ItemWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 3fr 1fr;
  width: 100%;
  min-height: 5rem;
  padding: 0.6rem 1.5rem !important;
  align-items: center;
  border-bottom: var(--greyLight-1) solid 2px;
  cursor: ${(props) => props.cursor};

  * {
    width: 100%;
  }

  .Title {
    font-size: 1.3rem;
  }

  &:nth-child(1) {
    border-top: var(--greyLight-1) solid 2px;
  }

  & div:nth-child(1),
  & div:nth-child(3) {
    /* cursor: pointer; */
    /* cursor: ${(props) => props.cursor}; */
    width: 100%;
    color: var(--greyDark);
  }

  & div:nth-child(1) {
    font-size: 2.2rem;
    font-family: "SBAggroL";
    width: 100%;
  }

  & div:nth-child(2) {
    margin-left: 1rem;
  }

  & div:nth-child(3) {
    text-align: right;
    font-size: 0.9rem;
  }

  &:hover {
    background-color: ${(props) =>
      props.isBlank ? null : "var(--greyLight-1)"};
    color: var(--primary);

    svg {
      color: var(--primary-dark);
    }

    & div:nth-child(1) {
      color: var(--grey-dark);
    }
  }

  svg {
    font-size: 2rem;
    margin: 0 !important;
  }

  path {
    color: var(--primary);
  }
`;

export default ListItem;
