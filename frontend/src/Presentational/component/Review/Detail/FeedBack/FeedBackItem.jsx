import styled from "styled-components";
import SubTitle from "../../../../common/SubTitle";

//각 피드백을 누가 어떻게 적었는지 체크
const FeedBackItem = ({data}) => {
    return (
        <FeedBack>
            <FeedBackTitle>
              <SubTitle title={data.writer.name}></SubTitle>
              <SubTitle title={data.score}></SubTitle>
            </FeedBackTitle>
            <div>{data.content}</div>
        </FeedBack>
    )
}

const FeedBack = styled.div`
  width: 100%;
  & > div:nth-child(2) {
    text-indent: 20px;
  }
  margin-bottom: 50px;
`

const FeedBackTitle = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;

  & > div:first-child{
    font-weight: bold;
    font-size: 25px;
    margin-right: 25px;
    color: var(--greyDark);
  }

  & > div:nth-child(2){
    font-weight: bold;
    font-size: 25px;
    color: var(--primary);
  }

  & > div:nth-child(3) {
    color: var(--textColor);
  }
`

export default FeedBackItem;