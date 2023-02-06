//#region import
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Title from "../common/Title";
import SubTitle from "../common/SubTitle";
import GoHome from "../common/GoHome";
import FilterArea from "../component/Review/Filter/FilterArea";
import HistoryList from "../component/Review/History/HistoryList";
import DetailArea from "../component/Review/Detail/DetailArea";
import AggroL from "../common/Font/AggroL";
import AggroM from "../common/Font/AggroM";
import { TiStarburst } from "react-icons/ti";

//#endregion

const ReviewPage = (props) => {
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
  //#endregion

  return (
    <ReviewMainBody>
      <AggroL />
      <AggroM />
      <GoHome />
      <TiStarburst />
      <Title title={titleText}></Title>
      <BoardBox>
        <SubTitle title={subtitleText}></SubTitle>
        {/* <FilterArea /> */}
        <HistoryList setSelectedID={setSelectedID} />
      </BoardBox>
      <BoardBox>
        <DetailArea selectedID={selectedID} />
      </BoardBox>
    </ReviewMainBody>
  );
};

export default ReviewPage;

const ReviewTitle = styled.div`
  font-family: SBagrroL;
  display: flex;
  font-size: 3rem;
  line-height: 4rem;
  color: var(--greyDark);

  div {
    font-family: SBagrroM;
    font-size: 3rem;
    color: var(--primary);
  }
`;

const BoardBox = styled.div`
  margin-top: 7em;
  width: 100%;

  > .SubTitle {
    font-size: 1.3rem;
    font-family: SBagrroM;
    color: var(--primary-light);
    padding: 1.4rem 1rem 1rem 1rem;
    border-bottom: solid 2px var(--greyDark);
    /* background-color: var(--primary-light); */
    /* border-radius: 1rem  1rem  0 0; */
    /* border-bottom: solid 3px var(--primary-light); */

    * {
      padding: 0;
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
  }
`;
