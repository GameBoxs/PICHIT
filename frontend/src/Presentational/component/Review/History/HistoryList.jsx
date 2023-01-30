import React from "react";
import styled from "styled-components";
import { useState } from "react";

import ListItem from "./ListItem";
import PageBar from "../../../common/Pagination/PageBar";

const HistoryList = ({ data }) => {
  //pagination 데이터
  // 전체데이터, 현재페이지, 페이지당 포스트갯수
  // const [dumyData, setDumyData] = useState(DUMMY_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  //현재 페이지에 렌더할 데이터를 추출하기위한 값들
  const lastPostIndex = currentPage * postsPerPage; //렌더할 페이지에 해당하는 마지막 인덱스값
  const firstPostIndex = lastPostIndex - postsPerPage; //렌더할 페이지에 해당하는 첫번째 인덱스값
  const currentPosts = data.slice(firstPostIndex, lastPostIndex); //현재 페이지에서 렌더할 데이터항목

  return (
    <>
      <ListBody>
        <Line></Line>
        {currentPosts.map((item, index) => {
          return (
            <>
            <ListItem
              item={item}
              key={index}
              index={index}
              lastIndex={data.length - 1}
              postsPerPage={postsPerPage}
            ></ListItem></>
          );
        })}
      </ListBody>
      <PageBar
        totalPosts={data.length} //전체 데이터 길이
        postsPerPage={postsPerPage} //페이지당 게시물 수
        setCurrentPage={setCurrentPage} //현재 페이지를 계산하는 함수
        currentPage={currentPage} //현재페이지
      />
    </>
  );
};

const ListBody = styled.div`
  width: 100%;
  height: 450px;
  & hr {
    opacity: 0.2;
  }
`;

// const HistoryPagenationArea = styled.div`
//   width: 100%;
//   height: 50px;
//   margin-bottom: 50px;
//   span {
//     display: inline-block;
//     width: 100%;
//     text-align: center;
//   }
// `
const Line = styled.hr`
        margin: 15px 0 15px 0;
    `;

export default HistoryList;
