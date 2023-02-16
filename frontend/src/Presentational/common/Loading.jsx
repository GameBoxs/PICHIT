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

const LoadingCompo = styled.div`
    width: inherit;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
`