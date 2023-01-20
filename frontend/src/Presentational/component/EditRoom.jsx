import styled from "styled-components";
import Calendar from "react-calendar";
import React,{useState} from "react";

function EditRoom() {

  const [value, onChange] =useState(new Date())

  return (

      <ModalContainer>
        <Layout>
          <Section width="50%">
            <Calendar onChange={onChange} value={value}></Calendar></Section>
          <Section width="50%">
              <InfoList>
                <Info>
                  <InfoText>방 이름</InfoText> <InfoInput /></Info> 
                <Info>
                  <InfoText>모집 인원</InfoText><InfoInput /></Info> 
                <Info>
                  <InfoText>연락 방법</InfoText><InfoInput /></Info> 
                <Info>
                  <InfoText>비밀번호 변경</InfoText><InfoInput /></Info> 
              </InfoList>
          </Section>
        </Layout>
        <Layout>
          <Section width="100%">
            <RoomText placeholder="방 생성에 필요한 정보를 입력하세요"></RoomText>
          </Section>
        </Layout>
      </ModalContainer>

  );
}
export default EditRoom;


const ModalContainer = styled.div`
  margin: 1em;
`

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
  flex-wrap: wrap;
  justify-content: flex-end;

    
`
const Info = styled.div`
display: inline-flex;
padding: 10px;
align-items: center;


`

const InfoText = styled.div`

`
const InfoInput = styled.input.attrs({type:"text"})`
  background-color: gray;
  border-radius: 5px;
  height: 30px;
  margin: 10px;
  border: none;
`

const RoomText = styled.textarea`
  width:100%;
  height: 200px;
  
`