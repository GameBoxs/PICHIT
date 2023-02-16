//#region import
import React, { useState, memo, useRef, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Title from "../common/Title";
import SubTitle from "../common/SubTitle";
import GoHome from "../common/GoHome";
import HistoryList from "../component/Review/History/HistoryList";
import DetailArea from "../component/Review/Detail/DetailArea";
import { TiStarburst } from "react-icons/ti";

//#endregion

const ReviewPage = (props) => {
  const moveRef = useRef(null);
  const user = useSelector((state) => state.userinfo);
  const [selectedID, setSelectedID] = useState();

  //#region 타이틀 텍스트 변수
  // 피드백 타이틀 텍스트
  const titleText = (
    <div>
      <ReviewTitle>안녕하세요</ReviewTitle>
      <ReviewTitle>
        <div>{user.name}</div>님
      </ReviewTitle>
    </div>
  );

  // 피드백 서브타이틀 텍스트
  const subtitleText = "기록 선택하기";

  useEffect(() => {
    // //선택이 되면 하단 DetailArea로 스크롤 이동
    if (selectedID) {
      moveRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedID]);

  return (
    <ReviewMainBody>
      <GoHome />
      <TiStarburst />
      <Title title={titleText}></Title>
      <BoardBox>
        <SubTitle title={subtitleText}></SubTitle>
        {/* <FilterArea /> */}
        <HistoryList setSelectedID={setSelectedID} />
      </BoardBox>
      <ReviewBox>
        {selectedID ? (
          <DetailArea selectedID={selectedID} moveRef={moveRef} />
        ) : (
          <DetailArea selectedID={null} moveRef={moveRef} />
        )}
      </ReviewBox>
    </ReviewMainBody>
  );
};

export default memo(ReviewPage);

const ReviewTitle = styled.div`
  font-family: "SBAggroL";
  display: flex;
  font-size: 3rem;
  line-height: 4rem;
  color: var(--greyDark);

  div {
    font-family: "SBAggroM";
    font-size: 3rem;
    color: var(--primary);
  }
`;

const ReviewBox = styled.div``;

const BoardBox = styled.div`
  margin-block: 7em;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;

  .SubTitle {
    font-size: 1.3rem;
    font-family: "SBAggroM";
    color: var(--primary-light);
    padding: 1.4rem 1rem 1rem 1rem;
    height: 100%;
    /* border-bottom: solid 2px var(--greyDark); */
    /* background-color: var(--primary-light); */
    /* border-radius: 1rem  1rem  0 0; */
    /* border-bottom: solid 3px var(--primary-light); */

    * {
      padding: 0;
    }

    &:first-child {
      padding: 0 0 0 0;
    }
  }
`;

const ReviewMainBody = styled.div`
  height: 100%;
  margin: 22vh 17.5vw 10vh 17.5vw;
  width: 65vw;
  background-color: var(--white);

  > div:nth-child(1) {
    font-size: 50px;
    font-weight: bolder;
  }

  svg {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: var(--primary);

    path {
      color: var(--primary);
    }
  }
`;
