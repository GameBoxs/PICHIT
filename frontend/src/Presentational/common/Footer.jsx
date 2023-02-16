import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <FooterList>
        <Sheet>
          <Cols>
            <FirstCol>
              <Logo>PICHIT</Logo>
              <Ex>copyright By D107<br />화상면접 스터디 서비스입니다.</Ex>
            </FirstCol>
            <Col>
              <Header>Connect</Header>
              <Group>
                <Text>GitHub</Text>
                <Text>Figjam</Text>
              </Group>
            </Col>
            <Col>
              <Header>Our BE Info</Header>
              <Group>
                <Text>이희수(팀장)</Text>
                <Text>임수민</Text>
              </Group>
            </Col>
            <Col>
              <Header>Our FE Info</Header>
              <Group>
                <Text>김민지</Text>
                <Text>김지현</Text>
                <Text>김지훈</Text>
                <Text>이효진</Text>
              </Group>
            </Col>
          </Cols>
        </Sheet>
      </FooterList>
    </>
  );
};

export default Footer;

const FooterList = styled.div`
  background-color: var(--greyDark);
  color: var(--primary);
  width: 100%;
  position: relative;
  transform: translateY(50%);
  height: 260px;
  
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
`;
const Sheet = styled.div`
  margin: 0 auto;
  width: 980px;
  padding-top: 10px;
`;
const Cols = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const Col = styled.div`
  padding: 10px;
  width: 25%;
  height: 100%;
`;
const FirstCol = styled.div`
  padding: 10px;
  padding-right: 30px;
`;

const Header = styled.div`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.4px;
  line-height: 1.2;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
  margin-bottom: 10px;
  color: white;
`;
const Group = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.a`
  color: white;
  cursor: default;

  &:hover {
    color: var(--primary);
  }
`;
const Logo = styled.div`
  font-size: 24px;
  color: white;
  margin: 10px;
`;

const Ex = styled.div`
  font-size: 15px;
  color: white;
  margin-bottom: 4rem;
`;
