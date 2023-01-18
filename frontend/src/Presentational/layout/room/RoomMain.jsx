import styled from "styled-components";
import SubTitle from "../../common/SubTitle"

function RoomMain(props) {


    return(
    <>
    <Layout>
      <Section>
        <SubTitle title={'현재인원'} />
          <BlockList>
            <Block>Kim jh 남자의</Block>
            <Block>연예인 희수</Block>
            <Block>수민</Block>
            <Block>킹갓어쩌고 효진</Block>
          </BlockList>
        </Section>
      <Section>{props.content}</Section>
    </Layout>
        <SectionHeader>
          <SubTitle title={'자기소개서'} />
        </SectionHeader>
    <Layout>
      <Section>
        <Intro>방에 참여하면 팀원들의 자소서를 볼 수 있어요</Intro>
      </Section>
      <Section>질문칸</Section>
    </Layout>
    </>
    )
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
`

const Section = styled.div`
  width: 50%;
  height: 100%;
`
const SectionHeader = styled.div`
  border-bottom: 2px solid gray;
  padding-bottom: 10px;
`
const BlockList = styled.div`
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
const Block = styled.div`
  background-color: gray;
  width: 200px;
  height: 100px;
  margin:10px;
  border-radius: 5px;
  text-align: center;

`
const Intro = styled.div`
  background-color: gray;
  width: 100%;
  height: 500px;
  margin:10px;
  border-radius: 5px;
  text-align: center;

`