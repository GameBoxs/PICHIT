import styled from "styled-components";
import { useState } from "react";

import SubTitle from "../../../common/SubTitle";
import FeedBackArea from "./FeedBack/FeedBackArea";
import SoundArea from "./SoundArea";
import PageBar from "../../../common/Pagination/PageBar";


const DetailArea = ({data}) => {
    //pagination 데이터
//   // 전체데이터, 현재페이지, 페이지당 포스트갯수
//   // const [dumyData, setDumyData] = useState(DUMMY_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);

//   //현재 페이지에 렌더할 데이터를 추출하기위한 값들
  const lastPostIndex = currentPage * postsPerPage; //렌더할 페이지에 해당하는 마지막 인덱스값
  const firstPostIndex = lastPostIndex - postsPerPage; //렌더할 페이지에 해당하는 첫번째 인덱스값
  const currentPosts = data.slice(firstPostIndex, lastPostIndex); //현재 페이지에서 렌더할 데이터항목
  const currentPost = data[currentPage-1]
    return (
        <DetailWrap>
            <SubTitle title="면접 피드백" />
            <Line/>
            {/* {
                data.title !== null && data.title !== "" & data.title !== undefined ? <SoundArea/> : null
            }
            {
                data.title !== null && data.title !== "" & data.title !== undefined ? <FeedBackArea title={data.title} data={data.item}/> : null
            } */}
            {
                data !== null && data !== "" & data !== undefined ? <SoundArea/> : null
            }
            <PageBar
              totalPosts={data.length} //전체 데이터 길이(상황에 맞게변경)
              postsPerPage={postsPerPage}  //페이지당 게시물 수
              setCurrentPage={setCurrentPage} //현재 페이지를 계산하는 함수
              currentPage={currentPage} //현재페이지
            />
            <FeedBackArea title={currentPost.question} data={currentPost.reviews}/>
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