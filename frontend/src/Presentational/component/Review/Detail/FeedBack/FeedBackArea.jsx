import styled from "styled-components";
import Title from "../../../../common/Title";
import SubTitle from "../../../../common/SubTitle";
import Button from "../../../../common/Button";
import FeedBackItem from "./FeedBackItem";

import { memo, useRef } from "react";
import { useEffect } from "react";

const FeedBackArea = ({ title, data, timeStamp, playTime }) => {
  const targetElement = useRef(null);

  useEffect(() => {
    targetElement.current.scrollIntoView({ behavior: "smooth" });
  }, [title]);

  //시간 표시
  let tmpVal = timeStamp.secondTime;

  let m = Math.floor((tmpVal % 3600) / 60);
  let s = Math.floor((tmpVal % 3600) % 60);

  let sDisplay = s > 0 ? (s < 10 ? "0" + s.toString() : s) : "00";
  let mDisplay = m > 0 ? (m < 10 ? "0" + m.toString() : m) : "00";
  
  let tmpArr = [];
  
  if (tmpVal > 3600) {
    let h = Math.floor(tmpVal / 3600);
    let hDisplay = h > 0 ? h : "00";

    tmpArr = [hDisplay, mDisplay, sDisplay];
  } else {
    tmpArr = [mDisplay, sDisplay];
  }

  return (
    <FeedBackWrap>
      <Title title={title}></Title>
      {/* <SubTitle title="피드백"></SubTitle> */}

      <BtnArea>
        <PlayBtn onClick={() => {playTime(tmpVal)}}>
          <div>재생하기</div>
          <div>{tmpArr.join(":")}</div>
        </PlayBtn>
      </BtnArea>
      <div ref={targetElement}>
        {data
          ? data.map((datas, idx) => {
              return <FeedBackItem data={datas} key={idx} />;
            })
          : null}
      </div>
    </FeedBackWrap>
  );
};

const BtnArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PlayBtn = styled.div`
  gap: 1rem;
  border-radius: 1rem;
  min-width: 10vw;
  height: 6vh;
  padding: 1rem;
  box-shadow: 0.3rem 0.3rem 0.6rem let(--greyLight-2),
    -0.2rem -0.2rem 0.5rem let(--white);
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;
  grid-column: 1 / 2;
  grid-row: 4 / 5;
  background-color: let(--primary);
  box-shadow: inset 0.2rem 0.2rem 1rem let(--primary-light),
    inset -0.2rem -0.2rem 1rem let(--primary-dark),
    0.3rem 0.3rem 0.6rem let(--greyLight-2), -0.2rem -0.2rem 0.5rem let(--white);

  & * {
    color: let(--greyLight-1);
  }

  &:hover * {
    color: let(--white);
  }

  &:active {
    box-shadow: inset 0.2rem 0.2rem 1rem let(--primary-dark),
      inset -0.2rem -0.2rem 1rem let(--primary-light);
  }
`;

const FeedBackWrap = styled.div`
  width: 100%;

  & > div:first-child {
    text-align: center;
    font-weight: bolder;
    font-size: 40px;
    margin: 50px 0 10px 0;
  }

  & > div:nth-child(2) {
    margin-top: 10px;
    margin-bottom: 50px;
    font-weight: bold;
    font-size: 30px;
  }

  .SubTitle,
  .Title {
    font-family: "SBAggroL";
    color: let(--greyDark);
  }

  .Title {
    font-size: 2rem !important;
    color: let(--primary);
  }

  .SubTitle {
    font-size: 1.2rem !important;
    color: let(--primary-light);
  }
`;

export default memo(FeedBackArea);
