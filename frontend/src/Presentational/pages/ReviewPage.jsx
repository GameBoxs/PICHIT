//#region import
import React from "react";
import styled from "styled-components";
import Title from "../common/Title";
import SubTitle from "../common/SubTitle";

import FilterArea from "../component/Review/Filter/FilterArea";
import HistoryList from "../component/Review/History/HistoryList";
import DetailArea from "../component/Review/Detail/DetailArea";
import { useSelector } from "react-redux";
import useAxios from "../../action/hooks/useAxios";
import { useState } from "react";
import { useEffect } from "react";
//#endregion

const ReviewPage = (props) => {
  const user = useSelector(state => state.userinfo);
  // const token = useSelector(state => state.token);
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcGVha29uIiwibmFtZSI6IuydtO2drOyImCIsImlkIjoxLCJleHAiOjE2NzY1NTY2ODcsImlhdCI6MTY3NDc0MjI4NywidXNlcklkIjoia2FrYW9fMjYyOTgzOTQ2MiJ9.TxhacA4jIPlIJLQt8Dlz5Xl-loXmfhtnnUOofpBAUnO8IT2e3t5vi_KY-yQ194QMcI4l7bLHKL5EIUqsnVCWAg'
  
  const [data, setData] = useState();
  const [nowPage, setNowPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [getData, isLoading] = useAxios(`my-interviewjoins?size=5&page=${nowPage-1}&finished=2`,'GET',token);
  
  useEffect(() => {
    if(getData && getData.data){
      setData(getData.data.content);
      setTotalElements(getData.data.totalElements);
      setTotalPage(getData.data.totalPage);
    }
  },[getData]);

  //#region 타이틀 텍스트 변수
  // 피드백 타이틀 텍스트
  const titleText = (
    <div>
      안녕하세요 <br /> {user.name}님
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
  const data123 = [
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
    {
      Title: '2023 새해기념 콘서트-"새해에는 희수와 함께"',
      Day: "23.01.12",
      Processing: "N",
    },
    {
      Title: '2023 1월끝나간다-"울지마 희수"',
      Day: "23.01.12",
      Processing: "N",
    },
    {
      Title: '2023 2월에는 디자인작업 몰두-"희수는 아무것도 몰라"',
      Day: "23.01.12",
      Processing: "N",
    },
    {
      Title: '2023 곧 통신시작예정-"희수, 통신에 거대한기여.. 그냥 귀추가 주목됨"',
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
  const testdata = [{
    "question": '1. 질문질문질문질문질문질문질문질문질문질문질문질문',
    "reviews": [{
      "name": "김지훈",
      "score": '5점',
      "feedback":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales tempor viverra. Vivamus eleifend iaculis risus, in posuere quam fermentum eget. Sed est massa, porta eu varius et, tincidunt ac lorem. Ut laoreet dolor mi, ac fermentum orci dignissim nec. Vestibulum non malesuada felis. In consequat odio arcu. In hac habitasse platea dictumst. Etiam luctu"
    },{
      "name": "김지훈2",
      "score": '2점',
      "feedback":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales tempor viverra. Vivamus eleifend iaculis risus, in posuere quam fermentum eget. Sed est massa, porta eu varius et, tincidunt ac lorem. Ut laoreet dolor mi, ac fermentum orci dignissim nec. Vestibulum non malesuada felis. In consequat odio arcu. In hac habitasse platea dictumst. Etiam luctu"
    },{
      "name": "김지훈3",
      "score": '4점',
      "feedback":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales tempor viverra. Vivamus eleifend iaculis risus, in posuere quam fermentum eget. Sed est massa, porta eu varius et, tincidunt ac lorem. Ut laoreet dolor mi, ac fermentum orci dignissim nec. Vestibulum non malesuada felis. In consequat odio arcu. In hac habitasse platea dictumst. Etiam luctu"
    },]
  },{
    "question": '2. 질문2질문2질문2질문2질문2질문222222222222질문질문질문질문질문',
    "reviews": [{
      "name": "김지훈",
      "score": '5점',
      "feedback":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales tempor viverra. Vivamus eleifend iaculis risus, in posuere quam fermentum eget. Sed est massa, porta eu varius et, tincidunt ac lorem. Ut laoreet dolor mi, ac fermentum orci dignissim nec. Vestibulum non malesuada felis. In consequat odio arcu. In hac habitasse platea dictumst. Etiam luctu"
    },{
      "name": "김지훈2",
      "score": '2점',
      "feedback":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales tempor viverra. Vivamus eleifend iaculis risus, in posuere quam fermentum eget. Sed est massa, porta eu varius et, tincidunt ac lorem. Ut laoreet dolor mi, ac fermentum orci dignissim nec. Vestibulum non malesuada felis. In consequat odio arcu. In hac habitasse platea dictumst. Etiam luctu"
    },{
      "name": "김지훈3",
      "score": '4점',
      "feedback":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales tempor viverra. Vivamus eleifend iaculis risus, in posuere quam fermentum eget. Sed est massa, porta eu varius et, tincidunt ac lorem. Ut laoreet dolor mi, ac fermentum orci dignissim nec. Vestibulum non malesuada felis. In consequat odio arcu. In hac habitasse platea dictumst. Etiam luctu"
    },]
  },{
    "question": '3. 33333333333문질문질문질문질문질문질문질문',
    "reviews": [{
      "name": "김지훈",
      "score": '5점',
      "feedback":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales tempor viverra. Vivamus eleifend iaculis risus, in posuere quam fermentum eget. Sed est massa, porta eu varius et, tincidunt ac lorem. Ut laoreet dolor mi, ac fermentum orci dignissim nec. Vestibulum non malesuada felis. In consequat odio arcu. In hac habitasse platea dictumst. Etiam luctu"
    },{
      "name": "김지훈2",
      "score": '2점',
      "feedback":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales tempor viverra. Vivamus eleifend iaculis risus, in posuere quam fermentum eget. Sed est massa, porta eu varius et, tincidunt ac lorem. Ut laoreet dolor mi, ac fermentum orci dignissim nec. Vestibulum non malesuada felis. In consequat odio arcu. In hac habitasse platea dictumst. Etiam luctu"
    },{
      "name": "김지훈3",
      "score": '4점',
      "feedback":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales tempor viverra. Vivamus eleifend iaculis risus, in posuere quam fermentum eget. Sed est massa, porta eu varius et, tincidunt ac lorem. Ut laoreet dolor mi, ac fermentum orci dignissim nec. Vestibulum non malesuada felis. In consequat odio arcu. In hac habitasse platea dictumst. Etiam luctu"
    },]
  },
]
  // const detailData = {};

  //#endregion

  return (
    <ReviewMainBody>
      <Title title={titleText}></Title>
      <SubTitle title={subtitleText}></SubTitle>
      <Line></Line>
      {/* <FilterArea /> */}
      {
        isLoading === true ? <div>loading...</div> : 
        <>
          {/* <HistoryList data={data} />
          <DetailArea data={testdata} /> */}
        </>
      }
      {/* <HistoryList data={data} />
      <DetailArea data={testdata} /> */}
    </ReviewMainBody>
  );
};

export default ReviewPage;

const Line = styled.hr`
  margin: 15px 0 15px 0;
`;
const ReviewMainBody = styled.div`
  margin: 10em 10em 0 10em;
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
