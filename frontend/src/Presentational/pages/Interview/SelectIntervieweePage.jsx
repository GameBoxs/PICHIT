import React from "react";
import styled from "styled-components";
import Button from "../../common/Button";
import { Link } from "react-router-dom";

import Screen from "../../layout/Interview/Screen";

const SelectIntervieweePage = () => {
  //방장이 면접자를 고를 때/고르지 않을 때 뜰 문구
  const sentance = true ? "대기 중입니다" : "방장이 면접자를 선택하고 있습니다";

  return (
    <Container>
      <Title>대기실</Title>
      <ConditionSentance>{sentance}</ConditionSentance>
      <Screen number={4} />
      <BottomPanel>
        <Button text="시작" />
        <Link to="/room">
          <Button text="종료" />
        </Link>
      </BottomPanel>
    </Container>
  );
};

export default SelectIntervieweePage;

const BottomPanel = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

const ConditionSentance = styled.h3`
  margin-bottom: 2em;
`;

const Title = styled.h1`
  font-size: 3em;
  margin: 0;
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
