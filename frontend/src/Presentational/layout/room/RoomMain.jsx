import styled from "styled-components";
import SubTitle from "../../common/SubTitle";
import React,{ useState,useEffect } from "react";
import QuestionBox from "./QuestionBox";
import Resume from "./Resume";


function RoomMain({join, content}) {

  const [isJoin, setIsJoin] = useState(true);

  useEffect(() => {
    setIsJoin(join);
    console.log("isJoin", isJoin);
  }, [join])

  const RoomSection =  !isJoin ? <Resume /> : (
    <Intro>방에 참여하면 팀원들의 자소서를 볼 수 있어요</Intro>
  );
  
  const RoomQuestion = !isJoin ? <QuestionBox />: (
    <PopUp>질문을 볼 수 없습니다.</PopUp>
  )


  return (
    <>
      <Layout>
        <Section width="50%">
          <SubTitle title={"현재인원"} />
          <BlockList>
            <Block>Kim jh 남자의</Block>
            <Block>연예인 희수</Block>
            <Block>수민</Block>
            <Block>킹갓어쩌고 효진</Block>
          </BlockList>
        </Section>
        <Section width="50%">{content}</Section>
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
  width: 200px;
  height: 100px;
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

