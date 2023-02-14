import styled from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading(){
    return(
        // <TestCompo>
            <LoadingCompo>
                loading...
                <AiOutlineLoading3Quarters/>
            </LoadingCompo>
        // </TestCompo>
    )
}

export default Loading;

// const TestCompo = styled.div`
//     width : 400px;
//     height: 400px;
//     /* display: flex; */

// `

const LoadingCompo = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center
`