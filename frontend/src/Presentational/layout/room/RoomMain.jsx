import styled from "styled-components";
import SubTitle from "../../common/SubTitle";
import React, { useState, useEffect } from "react";
import QuestionBox from "./QuestionBox";
import Resume from "./Resume";

function RoomMain({ join, host, data }) {
  const [isJoin, setIsJoin] = useState(true);
  const [pdf, setPdf] = useState(0);
  // 참여하기
 const description = data.description


  
  useEffect(() => {
    setIsJoin(join);
    console.log("isJoin", isJoin);
  }, [join]);

  // roompage에 있는 join 값이 바뀔 때 마다 setIsJoin 실행 함

  const RoomSection =
    (isJoin || host) ? (
      <Resume idx={pdf} />
    ) : (
      <Intro>방에 참여하면 팀원들의 자소서를 볼 수 있어요</Intro>
    );

  const RoomQuestion =
  (isJoin || host) ? <QuestionBox idx={pdf} /> : <PopUp>질문을 볼 수 없습니다.</PopUp>;

  // isJoin값에 따라서 볼 수 있는 컴포넌트가 변경됨

  const dummy = [
    '연예인 희수',
    'Kim jh 남자의',
    '수민',
    '킹갓 어쩌고 효진 '
  ]

  const pdfHandler = (person, idx) => {
    console.log(person)
    setPdf(idx)
  }

  const MemberList = dummy.map((person, idx) => {
    return <Block key={idx} onClick={() => pdfHandler(person, idx)}>{person}</Block>
  })

  return (
    <>
      <Layout>
        <Section width="50%">
          <SubTitle title={"현재인원"} />
          {!isJoin ?   
          (
            <BlockList>
              <Block>공란</Block>
              <Block>Kim jh 남자의 자소서</Block>
              <Block>수민 자소서</Block>
              <Block>킹갓어쩌고 효진의 자소서</Block>
            </BlockList>
          ):
          (
            <BlockList>
              {MemberList}
            </BlockList>
          )}
        </Section>
        <Section width="50%">{description}</Section>
      </Layout>
      <SectionHeader>
        <SubTitle title={"자기소개서"} />
      </SectionHeader>
      <Layout>
        <Section width="70%">{RoomSection}</Section>
        <Section width="30%">{RoomQuestion}</Section>
      </Layout>
    </>
  );
}

export default RoomMain;
const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
  height: 50%;
  width: 100%;
  margin-bottom: 1em;
  margin-top: 1em;
`;

const Section = styled.div`
  width: ${(props) => props.width};
  height: 100%;
`;
const SectionHeader = styled.div`
  border-bottom: 2px solid gray;
  padding-bottom: 10px;
`;
const BlockList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const Block = styled.div`
  background-color: gray;
  width: 40%;
  height: 150px;
  margin: 10px;
  border-radius: 5px;
  text-align: center;
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
