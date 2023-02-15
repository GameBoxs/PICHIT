/* ETC Import */
import styled, { keyframes } from "styled-components";

const BounceText = () => {
    return (
        <BounceWrap>
            <Ellipsis className="oneE"/> 
            <Ellipsis className="twoE"/> 
            <Ellipsis className="threeE"/> 
        </BounceWrap>
    )
}

export default BounceText;

/* Styled-Component */
const BounceWrap = styled.div`
    height: 30px;
    display: flex;
    align-items: center;
    margin-top: 2%;
    background-color: var( --greyLight-1);
    width: 70px;
    border-radius: 20px 20px 20px 20px;
`

const bounce = keyframes`
    30% { transform: translateY(-2px); }
    60% { transform: translateY(0px); }
    80% { transform: translateY(2px); }
    100% { transform: translateY(0px); opacity: 0.5;  }
`

const Ellipsis = styled.div`
    width: 10px;
    height: 10px;
    margin-left: 10px;
    margin-top: 3px;
    background-color: var(--primary);
    border-radius: 50%;
    animation: ${bounce} 1.3s linear infinite;

    :first-child {
        animation-delay: 0.6s;
    }
    :nth-child(2) {
        animation-delay: 0.5s;
    }
    :last-child {
        animation-delay: 0.8s;
    }
`