import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ContextBox = () => {
  const navigate = useNavigate();
  return (
    <BodyWrap>
      <HeadText>404</HeadText>
      <SubText>Page Not Found</SubText>
      <ButtonWrap>
        <ActionWrap>
          <LinkBtn
            onClick={() => {
              navigate("/");
            }}
          >
            Go to MainPage
          </LinkBtn>
        </ActionWrap>
      </ButtonWrap>
    </BodyWrap>
  );
};

const BodyWrap = styled.div`
  height: 200px;
  width: 380px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: 50px;
  color: #000;
  font-family: Roboto;
  font-weight: 300;
`;
const HeadText = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 60px;
  line-height: 46px;
  margin-bottom: 40px;
`;
const SubText = styled.p``;

const ButtonWrap = styled.div``;
const ActionWrap = styled.div`
  margin-top: 40px;
`;
const LinkBtn = styled.a`
  background: var(--primary);
  padding: 8px 25px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s linear;
  cursor: pointer;
  text-decoration: none;
  margin-right: 10px;

  &:hover {
    background: var(--primary-dark);
    color: #fff;
  }
`;

export default ContextBox;
