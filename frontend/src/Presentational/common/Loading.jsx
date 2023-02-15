import styled from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading(){
    return(
        <LoadingCompo>
            loading...
            <AiOutlineLoading3Quarters/>
        </LoadingCompo>
    )
}

export default Loading;

const TestCompo = styled.div`
//     width : 400px;
//     height: 400px;
//     /* display: flex; */
`

const LoadingCompo = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
`