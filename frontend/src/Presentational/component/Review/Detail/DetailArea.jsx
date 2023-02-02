import styled from "styled-components";
import { useState } from "react";

import SubTitle from "../../../common/SubTitle";
import FeedBackArea from "./FeedBack/FeedBackArea";
import SoundArea from "./SoundArea";
import PageBar from "../../../common/Pagination/PageBar";


const DetailArea = ({selectedID}) => {
    
    return (
        <DetailWrap>
            <SubTitle title="면접 피드백" />
            <Line/>
            {
                selectedID ?
                <SoundArea/>
                /* <PageBar
                  totalPosts={data.length} //전체 데이터 길이(상황에 맞게변경)
                  postsPerPage={postsPerPage}  //페이지당 게시물 수
                  setCurrentPage={setCurrentPage} //현재 페이지를 계산하는 함수
                  currentPage={currentPage} //현재페이지
                />
                <FeedBackArea title={currentPost.question} data={currentPost.reviews}/> */
                :null
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