import React from "react";
import styled from "styled-components";
import Button from "../../common/Button";
import { Link } from "react-router-dom";

import Screen from "../../layout/Interview/Screen";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const SelectIntervieweePage = () => {
  //방장이 면접자를 고를 때/고르지 않을 때 뜰 문구
  const sentance = true ? "대기 중입니다" : "방장이 면접자를 선택하고 있습니다";

  // 면접자 선택을 위한 dummy data
    const dummy = [
    '연예인 희수',
    'Kim jh 남자의',
    '수민',
    '킹갓 어쩌고 효진 '
  ]

    const MemberList = dummy.map((person,idx) => {
      return <option key={idx}>{person}</option>
    })
// 방장이 시작 버튼 눌렀을 때, 면접자 선택 모달 


  const handler = () => {
    MySwal.fire({
      title:"면접자를 선택해주세요",
      icon:'question',
      html:(
        <div>
          <select>
            {MemberList}
          </select>

        </div>
      )

      
    })
  }
  

  return (
    <Container>
      <Title>대기실</Title>
      <ConditionSentance>{sentance}</ConditionSentance>
      <Screen number={4} />
      <BottomPanel>
        <Button handler={handler} text="시작" />
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
  font-size: 1em;
  margin-bottom: 1em;
`;

const Title = styled.h1`
  font-size: 2em;
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
