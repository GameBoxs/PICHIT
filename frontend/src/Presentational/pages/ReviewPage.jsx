//#region import
import React, { useEffect } from "react";
import Soundbar from "../component/Soundbar";
import Sampling from "../../store/asset/HypeBoy.mp3";
import { useRef, useState } from "react";
import ControlPanel from "../component/ControlPanel";
import styled from "styled-components";
import Title from "../common/Title";
import SubTitle from "../common/SubTitle";
import Button from "../common/Button";

import {ToggleButton,DarkModToggleButton} from "../common/ToggleButton";
//#endregion

const ReviewPage = (props) => {
  //#region Hook

  //#region useState Hook
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrectTime] = useState(0);
  //#endregion

  //#region useRef Hook
  const audioRef = useRef();
  //#endregion

  //#endregion

  //#region 타이틀 텍스트 변수
  // 피드백 타이틀 텍스트
  const titleText = (
    <div>
      안녕하세요 <br /> 김지훈님
    </div>
  );

  // 피드백 서브타이틀 텍스트
  const subtitleText = (
    <div
      style={{ fontSize: "25px", marginTop: "50px", fontWeight: "bold" }}
    >
      기록 선택하기
    </div>
  );
  //#endregion

  //#region 오디오 Bar 클릭시 해당 위치에서 음악 재생
  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;

    setPercentage(e.target.value);
  };
  //#endregion

  //#region 오디오 재생함수
  const play = () => {
    const audio = audioRef.current;
    audio.volume = 0.1;

    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    } else {
      setIsPlaying(false);
      audio.pause();
    }
  };
  //#endregion
  
  //#region 진행 시간, 퍼센트 구하는 함수
  const getCurrentDuration = (e) => {
    const currentTime = e.currentTarget.currentTime; //현재 재생되고 있는 위치 반환
    const duration = e.currentTarget.duration; //현재 오디오바의 전체 길이를 초단위로 반환
    //전체 길이 중 현재 시간이 얼만큼 차지하고 있는 지 백분율로 보여줌
    const percent = ((currentTime / duration) * 100).toFixed(2);

    setPercentage(+percent);
    //toFixed:지정된 소수 자릿수로 반올림
    setCurrectTime(currentTime.toFixed(2));
  };
  //#endregion

  //#region 로깅 완료시 실행할 이벤트
  const loadedData = (e) => {
    //toFixed:지정된 소수 자릿수로 반올림
    setDuration(e.currentTarget.duration.toFixed(2));
  };
  //#endregion

  //#region 재생시간구하는 함수
  const playTime = (time) => {
    //받아온 시간을 바탕으로 duration에 맞는 값으로 계산
    const thisTime = time.split(":").map((el) => parseFloat(el));
    let start = 0;

    if (thisTime.length === 2) {
      start = thisTime[0] * 60 + thisTime[1];
    } else {
      start = thisTime[0] * 3600 + thisTime[1] * 60 + thisTime[2];
    }

    //현재 재생 시간을 selectTime으로 맞춤
    audioRef.current.currentTime = start;

    setIsPlaying(true);
    audioRef.current.play();
  };
  //#endregion

  //#region Variable
  const timeline = ["00:18", "1:09", "2:00"];
  //#endregion

  //#region Test Data
    const data = [{Title:"2022 연말 콘서트-이희수 전국 투어", Day:"23.01.12", Processing:"Y"},{Title:'2023 유럽투어 댄스쇼-"봉주르 희수"', Day:"23.01.12", Processing:"N"},{Title:'2023 아시아 콘서트-"We Love Heesu"', Day:"23.01.12", Processing:"E"},
    {Title:'2023 제 3회 팬미팅-"Hamchu Land"', Day:"23.01.12", Processing:"N"},{Title:'2023 아프리카 투어-"울지마 희수"', Day:"23.01.12", Processing:"N"}]
    // const data = [{},{},{},{},{}];
    const feedbackData = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales tempor viverra. Vivamus eleifend iaculis risus, in posuere quam fermentum eget. Sed est massa, porta eu varius et, tincidunt ac lorem. Ut laoreet dolor mi, ac fermentum orci dignissim nec. Vestibulum non malesuada felis. In consequat odio arcu. In hac habitasse platea dictumst. Etiam luctu";
  //#endregion
  return (
    <ReviewMainBody>
      <Title title={titleText}></Title>
      <SubTitle title={subtitleText}></SubTitle>
      <Line></Line>
      <FilterArea>
        <Button text="모두 보기"></Button>
        <Button text="진행중"></Button>
        <Button text="시작 예정"></Button>
        <Button text="스터디 종료"></Button>
      </FilterArea>
      <HistoryList>
        {
          data.map((item, index) => {
            return (
              <ListItem item={item} key={index} index={index} lastIndex={data.length-1}></ListItem>
            )
          })
        }
        <HistoryPagenationArea>
          <span>&lt; 1 2 3 4 ... 10 &gt;</span>
        </HistoryPagenationArea>
      </HistoryList>

      <DetailArea>
        <SubTitle title="면접 피드백"></SubTitle>
        <Line></Line>

        <SoundArea>
          {/* 보이는 사운드 바 */}
          <Soundbar
            onChange={onChange}
            percentage={percentage}
            duration={duration}
            timeline={timeline}
            />

          {/* 소리 재생하게 해주는 태그 */}
          <audio
            ref={audioRef}
            src={Sampling}
            onLoadedData={loadedData}
            onTimeUpdate={getCurrentDuration}
            ></audio>

          {/* 시간표시/재생 on off 버튼 */}
          <ControlPanel
            play={play}
            isPlaying={isPlaying}
            duration={duration}
            currentTime={currentTime}
            />

          {timeline.map((el, idx) => {
            return (
              <button
              onClick={() => {
                playTime(el);
              }}
              key={idx}
              >
                HIHIHI
              </button>
            );
          })}
        </SoundArea>
        <HistoryPagenationArea>
          <span>&lt; 1 2 3 4 ... 10 &gt;</span>
        </HistoryPagenationArea>
        <FeedBackArea>
          <Title title="1.질문질문질문질문질문질문질문질문질문질문"></Title>
          <SubTitle title="피드백"></SubTitle>
          <FeedBack>
            <FeedBackTitle>
              <SubTitle title="김지훈"></SubTitle>
              <SubTitle title="5점"></SubTitle>
            </FeedBackTitle>
            <SubTitle title={feedbackData}></SubTitle>
          </FeedBack>
        </FeedBackArea>
      </DetailArea>
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

const FilterArea = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  
  padding: 0 15px 0 15px;
  align-content: center;

  // 나중에 버튼 수정되면 삭제할 부분
  & * {
    margin: 0;
    margin-top: auto;
  }
  /////////////////////////////////
  & div:nth-child(1), div:nth-child(2), div:nth-child(3) {
    margin-right: 15px;
  }
`

const HistoryList = styled.div`
  width: 100%;
  & hr{
    opacity: 0.2;
  }
`

const ListItem = (props) => {
  let CurrentState = "";

  if(props.item.Processing==="Y") {
    CurrentState = "진행중";
  } else if(props.item.Processing==="N") {
    CurrentState = "진행 예정";
  } else if(props.item.Processing==="E") {
    CurrentState = "종료";
  }

  return(
    <>
    <Line></Line>
      <ItemWrap>
        <Title title={props.item.Title}></Title>
        <SubTitle title={props.item.Day}></SubTitle>
        <SubTitle title={CurrentState}></SubTitle>
        {props.item.Title !=="" && props.item.Title !== null && props.item.Title !== undefined ? <SubTitle title=">"></SubTitle> : null }
      </ItemWrap>
    {props.index === props.lastIndex ? <Line></Line> : null}
    </>
  )
}

const ItemWrap = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  * {
    line-height: 50px;
    height: 50px;
  }
  & > div:nth-child(1), div:nth-child(4) {
    font-weight: bolder;
  }
  & div:nth-child(1) {
    cursor: pointer;
    width: 75%;
  }
  & div:nth-child(2) {
    width: 10%;
  }
  & div:nth-child(3) {
    width: 10%;
  }
  & div:nth-child(4) {
    cursor: pointer;
    width: 5%;
    font-size: 30px;
  }
`

const HistoryPagenationArea = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 50px;
  span {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
`
const DetailArea = styled.div`
  width: 100%;

  & > div:first-child {
    font-weight: bolder;
    font-size: 25px;
  }
`

const SoundArea = styled.div`
  width: 100%;
  margin-top: 50px;
`

const FeedBackArea = styled.div`
  width: 100%;

  & > div:first-child {
    text-align: center;
    font-weight: bolder;
    font-size: 40px;
  }

  & > div:nth-child(2) {
    margin-top: 50px;
    margin-bottom: 25px;
    font-weight: bold;
    font-size: 30px;
  }
`

const FeedBack = styled.div`
  width: 100%;
  & > div:nth-child(2) {
    text-indent: 20px;
  }
  margin-bottom: 50px;
`
const FeedBackTitle = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;

  & > div:first-child{
    font-weight: bold;
    font-size: 25px;
    margin-right: 25px;
  }

  & > div:nth-child(2){
    font-weight: bold;
    font-size: 25px;
  }
`