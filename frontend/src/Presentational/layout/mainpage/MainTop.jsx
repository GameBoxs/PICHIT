import styled, { css, keyframes } from "styled-components";

function MainTop() {
    return(
        <>
        <TopBody>
          <Header>
            <WcontainerContents>
              <MainHeadingWrapper>
                <H1Tag>PICHIT</H1Tag>
                <WithOutTag>ON</WithOutTag>
              </MainHeadingWrapper>
              <MultiSubtitle>
                <p>Our team is 'Alppano'.</p>
                <p>The members are a celebrity and 'kjh man' and four people.</p>
                <p>The author of this page has a headache today.</p>
                <p>work hard.&nbsp;
                <LinkBlack>
                  {/* <a className="link black" href="#more"> */}
                  Learn More
                  {/* </a> */}
                </LinkBlack>
                </p>
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
  margin-top:2%;
  /* margin-left: 150px; */
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
  margin-bottom: 5em;
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
  top: 15px;
  z-index: 1;
  margin: 0;
  font-family: "Montserrat", sans-serif;
  color: black;
  font-size: 1200%;
  line-height: 0.8em;
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
const MultiSubtitle = styled.div`
  //h2태그로 되있던거
  margin-inline: 1rem;
  font-family: "Montserrat", sans-serif;
  color: #262626;
  font-size: 120%;
  text-align: center;
  text-transform: uppercase;
  //main-subtitle 클래스로 되있던거
  font-family: futura-pt, sans-serif;
  color: black;
  font-style: normal;
  font-weight: 400;
  line-height: 200%;
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

