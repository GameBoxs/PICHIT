import styled from "styled-components";
import Title from "../../../../common/Title";
import SubTitle from "../../../../common/SubTitle";
import FeedBackItem from "./FeedBackItem";

const FeedBackArea = ({title, data}) => {
    if(title !== null && title !== "" && title !== undefined)
    return(
        <FeedBackWrap>
            <Title title={title}></Title>
            <SubTitle title="피드백"></SubTitle>
            {
                data.map((data) => {
                    return(
                        <FeedBackItem data={data}/>
                    )
                })
            }
        </FeedBackWrap>
)
}

const FeedBackWrap = styled.div`
    width: 100%;

    & > div:first-child {
        text-align: center;
        font-weight: bolder;
        font-size: 40px;
        margin: 50px 0 50px 0;
    }

    & > div:nth-child(2) {
    margin-top: 50px;
    margin-bottom: 50px;
    font-weight: bold;
    font-size: 30px;
    }
`

export default FeedBackArea;