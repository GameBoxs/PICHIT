import styled, { keyframes } from "styled-components";

//메인 상단

function MainTop() {
  return (
    <>
      <TopBody>
        <Header>
          <WcontainerContents>
            <MainHeadingWrapper>
              <H1Tag>PITCHIT</H1Tag>
              <WithOutTag>ON</WithOutTag>
            </MainHeadingWrapper>
            <MultiSubtitle>
              <p>화상 면접 스터디 PICHIT</p>
              <p>자유롭게 면접을 진행해보세요</p>
              <p>이후에 나의 면접 실력을 체크해보세요</p>
              <p></p>
            </MultiSubtitle>
          </WcontainerContents>
        </Header>
      </TopBody>
    </>
  );
}

export default MainTop;

const TopBody = styled.div`
  //   background-color: #21ffda;
  //   /* height: 100vh; */
  margin: 15vh 0 0 0;
  padding: 0;
  width: 96vw;
  display: flex;
  justify-content: center;
  /* margin-left: 150px; */
`;

const Header = styled.div`
  position: relative;
`;

const WcontainerContents = styled.div`
  max-width: 1170px;
`;

const MainHeadingWrapper = styled.div`
  margin-bottom: 3em;
`;

const fadeInDown = keyframes`
  from {
      -webkit-transform: translate(0px, -30px);
      -ms-transform: translate(0px, -30px);
      transform: translate(0px, -30px);
    }
    to {
      opacity: 1;
    }
`;

const H1Tag = styled.h1`
  position: relative;
  top: 15px;
  z-index: 1;
  margin: 0 0 10px 0;
  color: var(--primary);
  font-size: 700%;
  line-height: 0.8em;
  font-weight: 800;
  text-transform: uppercase;
  opacity: 0;
  animation: ${fadeInDown} 1s both;
  font-family: 'SBAggroM';
  
`;

const WithOutTag = styled(H1Tag)`
  color: var(--textColor);
  animation: ${fadeInDown} 1s 0.3s both;
`;

const fadeInUp = keyframes`
  from {
    -webkit-transform: translate(0px, 41px);
    -ms-transform: translate(0px, 41px);
    transform: translate(0px, 41px);
  }
  to {
    opacity: 1;
  }
`;
const MultiSubtitle = styled.div`
  //h2태그로 되있던거
  color: #262626;
  font-size: 100%;
  text-align: center;
  //main-subtitle 클래스로 되있던거
  font-style: normal;
  font-weight: 400;
  text-transform: none;
  opacity: 0;
  animation: ${fadeInUp} 1s 0.6s both;

  *{
    margin-bottom: 1rem;
  }
`;

const LinkBlack = styled.a`
  //link클래스로 있던거
  -webkit-transition: color 200ms ease, 200ms ease;
  transition: color 200ms ease, 200ms ease;
  text-decoration: none;
  //link.black클래스로 있던거
  display: inline-block;
  border-bottom-color: var(--primary);
  color: var(--primary);
  cursor: pointer;

  &:hover {
    //link클래스로 있던거
    border-bottom-color: var(--primary-light);
    color: var(--primary-light);
  }
`;
