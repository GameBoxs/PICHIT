import styled from "styled-components";


const Footer = () => {
    return ( 
      <>
        <FooterList>
          <Sheet>
            <Cols>
              <FirstCol>
                <Logo>Speak On</Logo>
                <Ex>
                Securities offered through Neighborly Securities.
                </Ex>
              </FirstCol>
              <Col>
                <Header>Our Compamy</Header>
                <Group>
                  <Text>Careers</Text>
                  <Text>Blog</Text>
                  <Text>Careers</Text>
                  <Text>Blog</Text>
                </Group>
              </Col>
              <Col>
                <Header>General Info</Header>
                <Group>
                  <Text>Careers</Text>
                  <Text>Blog</Text>
                  <Text>Careers</Text>
                  <Text>Blog</Text>
                </Group>
              </Col>
              <Col>
                <Header>Connet</Header>
                <Group>
                  <Text>Careers</Text>
                  <Text>Blog</Text>
                  <Text>Careers</Text>
                  <Text>Blog</Text>
                </Group>
              </Col>
            </Cols>
          </Sheet>

        </FooterList>
      </>

    )
}

export default Footer; 

const FooterList = styled.div`
  background-color: black;
  color: black;
  width: 100%;
  position:absolute;
  bottom: 0;
  left:0;
`
const Sheet = styled.div`
  margin: 0 auto;
  width: 960px;
  padding-top: 10px;

`
const Cols = styled.div`
  columns:4
  
`
const Col = styled.div`
  padding: 10px
  
`
const FirstCol = styled.div`
  padding: 10px;
  padding-right: 30px;
`

const Header = styled.div`
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.4px;
      line-height: 1.2;
      padding-bottom: 10px;
      border-bottom: 2px solid white;
      margin-bottom: 10px;
      color: white;
` 
const Group = styled.div`
    display:flex;
    flex-direction: column;
`
const Text = styled.a`
  color: white;
  &:hover {
    color: gray;
  }
`
const Logo = styled.div`
  font-size: 24px;
  color: white;
  margin: 10px;
`

const Ex= styled.div`
  font-size: 15px;
  color: white;
`