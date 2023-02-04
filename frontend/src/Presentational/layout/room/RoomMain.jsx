import styled from "styled-components";
import SubTitle from "../../common/SubTitle";
import React, { useState, useEffect } from "react";
import QuestionBox from "./QuestionBox";
import Resume from "./Resume";
import PlanTime from "../../component/PlanTime";
import Person from "../../component/Person";

import { BsFillPersonFill } from "react-icons/bs";

function RoomMain({ join, host, data, userinfo }) {
  const {
    createdDate,
    currentPersonCount,
    description,
    finished,
    id,
    manager,
    maxPersonCount,
    participants,
    startDate,
    title,
  } = data;
  const [isJoin, setIsJoin] = useState(false);
  const [pdf, setPdf] = useState(0);

  useEffect(() => {
    setIsJoin(join);
  }, [join]);

  // roompage에 있는 join 값이 바뀔 때 마다 setIsJoin 실행 함

  const RoomSection =
    isJoin || host ? (
      <Resume idx={pdf} participants={participants}/>
    ) : (
      <Intro>방에 참여하면 팀원들의 자소서를 볼 수 있어요</Intro>
    );

  const RoomQuestion =
    isJoin || host ? (
      <QuestionBox idx={pdf} userinfo={userinfo} />
    ) : (
      <PopUp>질문을 볼 수 없습니다.</PopUp>
    );

  // isJoin값에 따라서 볼 수 있는 컴포넌트가 변경됨

  const pdfHandler = (person, idx) => {
    console.log(person);
    setPdf(idx);
  };

  const Recuritment = maxPersonCount - currentPersonCount;

  const PersonList = participants.map((elem, idx) => {
    if (elem.name === manager.name) {
      return <Person name={elem.name} isHost={true} key={idx} />;
    } else {
      return <Person name={elem.name} isHost={false} key={idx} />;
    }
  });

  const RecuritmentList = new Array(Recuritment).fill().map((_, idx) => {
    return <BsFillPersonFill key={idx} />;
  });

  return (
    <MainPageContainer>
      <SectionHeader>
        <SubTitle title={"Info"} />
      </SectionHeader>
      <Layout>
        <Section>
          <Card>
            <SubTitle title={"시작 일자"} />
            <PlanTime startDate={startDate}/>
          </Card>
          <Card>
            <SubTitle title={"참가 멤버"} />
            <BlockList>{PersonList}</BlockList>
          </Card>
          <Card>
            <SubTitle title={"남은 인원 수"} />
            <div>
              <BlockList>{RecuritmentList}</BlockList>
              {Recuritment}명
            </div>
          </Card>
        </Section>

        <Description>
          <SubTitle title={"Introduce"} />
          {description}
        </Description>
      </Layout>

      <SectionHeader>
        <SubTitle title={"자기소개서"} />
      </SectionHeader>
      <Layout>
        <Section>{RoomSection}</Section>
        <Section>{RoomQuestion}</Section>
      </Layout>
    </MainPageContainer>
  );
}

export default RoomMain;

const Description = styled.div`
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2),
    -0.2rem -0.2rem 0.5rem var(--white);
  transition: 0.3s ease;
  padding: 2rem 1rem;

  width: 100%;

  .SubTitle {
    margin-bottom: 1rem;
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
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
  }
`;

const SectionHeader = styled.div`
  padding-bottom: 10px;
`;

const BlockList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
`;

const Card = styled.div`
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2),
    -0.2rem -0.2rem 0.5rem var(--white);
  transition: 0.3s ease;
  padding: 1rem;
  width: 100%;
  height: 23vh;
  display: grid;
  grid-template-rows: 1fr 5fr;
  align-items: center;

  .SubTitle {
    position: relative;
    margin: 1rem 0 0 0;
    text-align: center;
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
    font-size: 2.5vw;
    margin-block: 0.5rem;
    color: var(--greyDark);
  }
`;

const Intro = styled.div`
  background-color: gray;
  width: 100%;
  height: 300px;
  margin: 10px 10px 5px 5px;
  border-radius: 5px;
  text-align: center;
`;

const PopUp = styled.div`
  background-color: gray;
  width: 100%;
  height: 300px;
  margin: 10px 10px 5px 5px;
  border-radius: 5px;
  text-align: center;
`;

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 3rem;
  width: 100%;
`;
