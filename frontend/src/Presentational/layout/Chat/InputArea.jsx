import styled from "styled-components";
import Input from "../../component/Chat/Input";

const InputArea = ({SetIncomMessage}) => {
    return (
        <InputWrap>
            <Input SetIncomMessage={SetIncomMessage}/>
        </InputWrap>
    )
}

const InputWrap = styled.div`
    display: flex;
    height: 100%;
`

export default InputArea;