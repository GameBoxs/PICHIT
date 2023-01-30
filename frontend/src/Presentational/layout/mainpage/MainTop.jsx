import styled, { css, keyframes } from "styled-components";

function MainTop() {
    return(
        <>
        <TopBody>
          <Header>
            <WcontainerContents>
              <MainHeadingWrapper>
                <H1Tag>SPEAK</H1Tag>
                <WithOutTag>ON</WithOutTag>
              </MainHeadingWrapper>
              <MultiSubtitle>
                Our team is 'Alppano'.
                The members are a celebrity and 'kjh man' and four people.
                The author of this page has a headache today.
                work hard.&nbsp;
                <LinkBlack>
                  {/* <a className="link black" href="#more"> */}
                  Learn More
                  {/* </a> */}
                </LinkBlack>
              </MultiSubtitle>
            </WcontainerContents>
          </Header>
        </TopBody>
      </>
    )
}

export default MainTop;


const TopBody = styled.div`
  //   background-color: #21ffda;
  //   /* height: 100vh; */
  margin-top: 30px;
  margin-left: 150px;
`;
const Header = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-bottom: 99px;
`;
const WcontainerContents = styled.div`
  max-width: 1170px;
  padding-right: 20px;
  padding-left: 20px;

`;
const MainHeadingWrapper = styled.div`
  margin-top: 32px;
  margin-bottom: 47px;
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
`
const H1Tag = styled.h1`
  position: relative;
  z-index: 1;
  margin-right: 0px;
  margin-left: 0px;
  font-family: "Montserrat", sans-serif;
  color: black;
  font-size: 99px;
  line-height: 87px;
  font-weight: 800;
  text-transform: uppercase;
  opacity: 0;
  animation : ${fadeInDown} 1s both;
`
const WithOutTag = styled(H1Tag)`
  color: white;
  animation : ${fadeInDown} 1s 0.3s both;
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
`
const MultiSubtitle = styled.h2`
  //h2태그로 되있던거
  margin-right: 0px;
  margin-left: 0px;
  padding-bottom: 92px;
  font-family: "Montserrat", sans-serif;
  color: #262626;
  font-size: 31px;
  line-height: 35px;
  font-weight: 800;
  text-align: center;
  text-transform: uppercase;
  //main-subtitle 클래스로 되있던거
  padding-bottom: 57px;
  font-family: futura-pt, sans-serif;
  color: black;
  font-size: 28px;
  line-height: 34px;
  font-style: normal;
  font-weight: 400;
  text-align: left;
  text-transform: none;
  opacity: 0;
  animation : ${fadeInUp} 1s 0.6s both;
`;
const LinkBlack = styled.a`
  //link클래스로 있던거
  border-bottom: 1px solid #0082fc;
  -webkit-transition: color 200ms ease, border-color 200ms ease;
  transition: color 200ms ease, border-color 200ms ease;
  color: #358df2;
  text-decoration: none;
  //link.black클래스로 있던거
  display: inline-block;
  border-bottom-color: black;
  color: black;
  &:hover {
    //link클래스로 있던거
    border-bottom-color: black;
    color: black;
    //link.black클래스로 있던거
    border-bottom-color: white;
    color: white;
  }
`;

