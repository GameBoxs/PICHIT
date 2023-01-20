import styled from "styled-components";

function EditRoom() {
  return (
    <>
      <Layout>
        <Section width="50%">여기는 달력용</Section>
        <Section width="50%">
            <InfoList>
               <Info>방 이름<InfoInput /></Info> 
               <Info>모집 인원<InfoInput /></Info> 
               <Info>연락 방법<InfoInput /></Info> 
               <Info>비밀번호 변경<InfoInput /></Info> 
            </InfoList>
        </Section>
      </Layout>
      <Layout>
        <Section width="100%">여기는 택스트 넣는곳</Section>
      </Layout>
    </>
  );
}
export default EditRoom;

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

const InfoList = styled.div`
    display: flex;

    
`
const Info = styled.div`

`
const InfoInput = styled.input.attrs({type:"text"})`
    
`