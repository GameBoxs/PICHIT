import styled from "styled-components";
import SubTitle from "../../common/SubTitle";
import React, { useState, useEffect } from "react";

import { BsFillPersonFill } from "react-icons/bs";

function RoomMainLoading() {
  

  return (
    <MainPageContainer>
      <SectionHeader>
        <SubTitle title={"Info"} />
      </SectionHeader>
      <Layout>
        <Section>
          <Card>
            <SubTitle title={"시작 일자"} />
          </Card>
          <Card>
            <SubTitle title={"참가 멤버"} />
          </Card>
          <Card>
            <SubTitle title={"남은 인원 수"} />
          </Card>
        </Section>

        <Description>
          <SubTitle title={"Introduce"} />
        </Description>
      </Layout>

      <SectionHeader>
        <SubTitle title={"자기소개서"} />
      </SectionHeader>
      <Layout>
      </Layout>
    </MainPageContainer>
  );
}

export default RoomMainLoading;

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
  justify-content: center;
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
