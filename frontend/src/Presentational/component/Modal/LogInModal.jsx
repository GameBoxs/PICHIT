import styled from "styled-components";

function LogInModal({handleOpenPop}) {
  return (
    <LayOut onClick={handleOpenPop}>
      <KakaoBtn>
        <KakaoImg
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          width="242"
        />
      </KakaoBtn>
      <br></br>
      카카오로 간편 로그인
    </LayOut>
  );
}
export default LogInModal;

const LayOut = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
`;

const KakaoImg = styled.img`
  margin: 20px;
  cursor: pointer;
  &:hover {
  }
`;

const KakaoBtn = styled.button`
  border: none;
  background-color: transparent;
`;
