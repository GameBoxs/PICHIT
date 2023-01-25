import styled from "styled-components"

function LogInModal() {
    return(
        <LayOut>
            <KakaoBtn>
             <KakaoImg
           src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
           width="242"
           />
           </KakaoBtn>
        <br></br>
        카카오로 간편 로그인
        <br></br>
        회원이 아니신가요? <a href="#">회원가입하기</a>
        </LayOut>
        )
}
export default LogInModal

const LayOut =styled.div`
    margin-top: 50px;
    margin-bottom: 20px;
`

const KakaoImg = styled.img`
 margin: 20px;
 cursor: pointer;
 &:hover {
       
    }
`

const KakaoBtn = styled.button`
    border: none;
    background-color:transparent;
    
`
