import { memo } from "react";
import styled from "styled-components";
import SubTitle from "../../common/SubTitle";
import React, { useState, useEffect } from "react";
import QuestionBox from "./QuestionBox";
import Resume from "./Resume";
import PlanTime from "../../component/PlanTime";
import Person from "../../component/Person";

import { BsFillPersonFill } from "react-icons/bs";
// import AggroL from "../../common/Font/AggroL";

function RoomMain(props) {
  const { userJoinInfo, data, userinfo } = props;
  const { join, host } = userJoinInfo;
  const {
    currentPersonCount,
    description,
    manager,
    maxPersonCount,
    participants,
    startDate,
    sessionOpened
  } = data;

  console.log(data)

  const [isJoin, setIsJoin] = useState(false);
  const [pdf, setPdf] = useState(0);
  const [pdfhandler, setPdfHandler] = useState({});

  useEffect(() => {
    setIsJoin(join);
    setPdfHandler({ ...participants[0] });
  }, [props]);

  // roompage에 있는 join 값이 바뀔 때 마다 setIsJoin 실행 함

  const RoomSection =
    isJoin || host ? (
      <Resume
        idx={pdf}
        participants={participants}
        setPdfHandler={setPdfHandler}
        pdfhandler={pdfhandler}
      />
    ) : (
      <Intro>방에 참여하면 팀원들의 자소서를 볼 수 있어요</Intro>
    );

  const RoomQuestion =
    isJoin || host ? (
      pdfhandler.interviewJoinId !== userinfo.interviewJoinId ? (
        <QuestionBox idx={pdf} userinfo={userinfo} pdfhandler={pdfhandler} sessionOpened={sessionOpened}/>
      ) : (
        <PopUp>
          스터디 전에
          <br /> 볼 수 없습니다.
        </PopUp>
      )
    ) : (
      <PopUp>질문을 볼 수 없습니다.</PopUp>
    );

  // isJoin값에 따라서 볼 수 있는 컴포넌트가 변경됨

  // const pdfHandler = (person, idx) => {
  //   console.log(person);
  //   setPdf(idx);
  // };

  const Recuritment = maxPersonCount - currentPersonCount;

  const PersonList = participants.map((elem, idx) => {
    if (elem.name === manager.name) {
      return <Person name={elem.name} isHost={true} key={idx} />;
    } else {
      return <Person name={elem.name} isHost={false} key={idx} />;
    }
  });

  const RecuritmentList =
    Recuritment === 0
      ? "구하는 인원이 없습니다"
      : new Array(Recuritment).fill().map((_, idx) => {
          return <BsFillPersonFill key={idx} />;
        });

  return (
    <MainPageContainer>
      <SectionHeader>
        <SubTitle title={"상세 정보"} />
      </SectionHeader>
      <Layout>
        <Section>
          <Card>
            <SubTitle title={"시작 일자"} />
            <PlanTime startDate={startDate} />
          </Card>
          <Card>
            <SubTitle title={"참가 멤버"} />
            <BlockList>{PersonList}</BlockList>
          </Card>
          <Card>
            <SubTitle title={"남은 인원 수"} />
            <div>
              <BlockList>{RecuritmentList}</BlockList>
              {Recuritment ? `${Recuritment}명` : null}
            </div>
          </Card>
        </Section>

        <Description>
          <SubTitle title={"Introduce"} />
          {description}
        </Description>
      </Layout>

      <SectionHeader>
        <SubTitle title={"자기소개서 보기"} />
      </SectionHeader>
      <Layout>
        <Section>
          {RoomSection}
          </Section>
        <Section>{RoomQuestion}</Section>
      </Layout>
    </MainPageContainer>
  );
}

export default memo(RoomMain);

const Description = styled.div`
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2),
    -0.2rem -0.2rem 0.5rem var(--white);
  transition: 0.3s ease;
  padding: 2rem 1rem;
  font-size: 1.2rem;
  width: 100%;

  .SubTitle {
    margin-bottom: 1rem;
    font-family: "SBAggroL";
    color: var(--greyDark);
  }
`;

const Section = styled.div`
  width: 100%;
`;

const Layout = styled.div`
  width: 100%;
  margin-bottom: 1em;
  margin-top: 1em;

  &:nth-child(2) {
    background-color: var(--greyLight-1);
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
    margin-bottom: 5rem;

    ${Section} {
      height: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
  }

  &:last-child {
    display: grid;
    grid-template-columns: 11fr 5fr;
    gap: 1rem;
    min-height: 500px;

    ${Section} {
      height: 100%;
    }
  }
`;

const SectionHeader = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .SubTitle {
    font-size: 1.2rem;
    font-family: "SBAggroL";
    color: var(--primary-light);
  }

  svg {
    font-size: 2rem;
  }
`;

const BlockList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  path {
    color: var(--greyDark);
  }
`;

const Card = styled.div`
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2),
    -0.2rem -0.2rem 0.5rem var(--white);
  transition: 0.3s ease;
  padding: 1rem;
  width: 100%;
  height: 26vh;
  display: grid;
  grid-template-rows: 1fr 5fr;
  align-items: center;

  .SubTitle {
    position: relative;
    margin: 1rem 0 0 0;
    text-align: center;
    font-family: "SBAggroL";
    color: var(--greyDark);
  }

  &:nth-child(3) div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &:nth-child(3) ${BlockList} {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 0.5rem;
    margin-block: 0.5rem;
    color: var(--greyDark);

    * {
      font-size: 2.5vw;
    }
  }
`;

const Intro = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: 1rem;
  text-align: center;
  background-color: var(--greyDark);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
`;

const PopUp = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  border-radius: 1rem;
  text-align: center;

  background-color: var(--greyDark);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
`;

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-block: 10vh;
  margin-top: 6vh;
`;
