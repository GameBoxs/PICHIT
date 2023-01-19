import styled from "styled-components";
import SubTitle from "../../../common/SubTitle";
import FeedBackArea from "./FeedBack/FeedBackArea";
import SoundArea from "./SoundArea";

const DetailArea = ({data}) => {
    return (
        <DetailWrap>
            <SubTitle title="면접 피드백" />
            <Line/>
            {
                data.title !== null && data.title !== "" & data.title !== undefined ? <SoundArea/> : null
            }
            {
                data.title !== null && data.title !== "" & data.title !== undefined ? <FeedBackArea title={data.title} data={data.item}/> : null
            }
        </DetailWrap>
    )
}

export default DetailArea;

const DetailWrap = styled.div`
    width: 100%;
    margin-bottom: 50px;
    & > div:first-child {
    font-weight: bolder;
    font-size: 25px;
    }

    & > div:nth-child(4) {
        margin-top: 50px;
    }
`

const Line = styled.hr`
  margin: 15px 0 15px 0;
`;