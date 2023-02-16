/* ETC Import */
import styled from "styled-components";

/* Component Import */
import Input from "../../component/Chat/Input";

const InputArea = ({SetIncomMessage, session, info}) => {
    return (
        <InputWrap>
            <Input SetIncomMessage={SetIncomMessage} session={session} info={info}/>
        </InputWrap>
    )
}

export default InputArea;

/* Styled-Component */
const InputWrap = styled.div`
    display: flex;
    height: 100%;
`
