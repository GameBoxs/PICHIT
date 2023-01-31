import { memo } from "react";
import styled from "styled-components";
import Input from "../../component/Chat/Input";

const InputArea = ({SetIncomMessage, session}) => {
    return (
        <InputWrap>
            <Input SetIncomMessage={SetIncomMessage} session={session}/>
        </InputWrap>
    )
}

const InputWrap = styled.div`
    display: flex;
    height: 100%;
`

export default InputArea;