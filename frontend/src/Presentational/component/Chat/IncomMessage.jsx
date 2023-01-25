import styled from "styled-components";
import SubTitle from "../../common/SubTitle";

const IncomMessage = ({data}) => {
    return (
        <IncomWrap>
            <Line />
            <TitleArea>
                <SubTitle title={data.Name} />
                <SubTitle title={data.Time} />
            </TitleArea>
            <MessageText>
                {data.Message}
            </MessageText>
        </IncomWrap>    
    )
}

const IncomWrap = styled.div`
    width: 100%;
    &:first-child {
        hr{
            opacity: 0;
        }
    }
    hr{
        opacity: 0.5;
    }
`
const Line = styled.hr`
`

const TitleArea = styled.div`
    height: 40px;
    display: flex;
    * {
        margin: 0;
    }
    & div:first-child {
        font-size: 18px;
        font-weight: bolder;
        line-height: 40px;
    }
    & div:last-child {
        line-height: 40px;
        margin-left: 10px;
        font-size: 15px;
    }
`

const MessageText = styled.p`
    margin-bottom: 15px;
    white-space: pre;
`

export default IncomMessage;