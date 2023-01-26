//#region import
import React from "react";
import styled from "styled-components";
import Title from "../common/Title";
import SubTitle from "../common/SubTitle";

import FilterArea from "../component/Review/Filter/FilterArea";
import HistoryList from "../component/Review/History/HistoryList";
import DetailArea from "../component/Review/Detail/DetailArea";
//#endregion

const ReviewPage = (props) => {
  //#region 타이틀 텍스트 변수
  // 피드백 타이틀 텍스트
  const titleText = (
    <div>
      안녕하세요 <br /> 김지훈님
    </div>
  );

  // 피드백 서브타이틀 텍스트
  const subtitleText = (
    <div style={{ fontSize: "25px", marginTop: "50px", fontWeight: "bold" }}>
      기록 선택하기
    </div>
  );
  //#endregion

  //#region Test Data
  const data = [
    {
      Title: "2022 연말 콘서트-이희수 전국 투어",
      Day: "23.01.12",
      Processing: "Y",
    },
    {
      Title: '2023 유럽투어 댄스쇼-"봉주르 희수"',
      Day: "23.01.12",
      Processing: "N",
    },
    {
      Title: '2023 아시아 콘서트-"We Love Heesu"',
      Day: "23.01.12",
      Processing: "E",
    },
    {
      Title: '2023 제 3회 팬미팅-"Hamchu Land"',
      Day: "23.01.12",
      Processing: "N",
    },
    {
      Title: '2023 아프리카 투어-"울지마 희수"',
      Day: "23.01.12",
      Processing: "N",
    },
  ];
  // const data = [{},{},{},{},{}];

  const detailData = {
    title: "1. 질문질문질문질문질문질문질문질문질문질문질문질문",
    item: [
      {
        name: "김지훈",
        score: "5점",
        feedback:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales tempor viverra. Vivamus eleifend iaculis risus, in posuere quam fermentum eget. Sed est massa, porta eu varius et, tincidunt ac lorem. Ut laoreet dolor mi, ac fermentum orci dignissim nec. Vestibulum non malesuada felis. In consequat odio arcu. In hac habitasse platea dictumst. Etiam luctu",
      },
      {
        name: "김지훈2",
        score: "5점",
        feedback:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales tempor viverra. Vivamus eleifend iaculis risus, in posuere quam fermentum eget. Sed est massa, porta eu varius et, tincidunt ac lorem. Ut laoreet dolor mi, ac fermentum orci dignissim nec. Vestibulum non malesuada felis. In consequat odio arcu. In hac habitasse platea dictumst. Etiam luctu",
      },
      {
        name: "김지훈3",
        score: "5점",
        feedback:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales tempor viverra. Vivamus eleifend iaculis risus, in posuere quam fermentum eget. Sed est massa, porta eu varius et, tincidunt ac lorem. Ut laoreet dolor mi, ac fermentum orci dignissim nec. Vestibulum non malesuada felis. In consequat odio arcu. In hac habitasse platea dictumst. Etiam luctu",
      },
    ],
  };
  // const detailData = {};

  //#endregion

  return (
    <ReviewMainBody>
      <Title title={titleText}></Title>
      <SubTitle title={subtitleText}></SubTitle>
      <Line></Line>
      <FilterArea />
      <HistoryList data={data} />
      <DetailArea data={detailData} />
    </ReviewMainBody>
  );
};

export default ReviewPage;

const Line = styled.hr`
  margin: 15px 0 15px 0;
`;

const ReviewMainBody = styled.div`
  margin: 0 10em 0 10em;
  height: 100%;

  & {
    .SubTitle {
      font-size: "25px";
      margin-top: "50px";
      font-weight: "bold";
    }

    > div:nth-child(1) {
      font-size: 50px;
      font-weight: bolder;
    }
  }
`;
