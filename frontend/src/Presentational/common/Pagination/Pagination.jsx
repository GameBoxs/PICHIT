import React, { useState } from "react";

import PagePost from './PagePost'
import PageBar from './PageBar'

const DUMMY_DATA = [
    {
      id: 1,
      Participant: 2,
      personnel: 4,
      title: "비밀방1",
      date: "23.01.24",
      secret: true
    },
    {
      id: 2,
      Participant: 2,
      personnel: 4,
      title: "방제목",
      date: "23.01.24",
      secret: false
    },
    {
      id: 3,
      Participant: 2,
      personnel: 4,
      title: "방제목",
      date: "23.01.24",
      secret: false
    },
    {
      id: 4,
      Participant: 2,
      personnel: 4,
      title: "비밀방2",
      date: "23.01.24",
      secret: true
    },
    {
      id: 5,
      Participant: 2,
      personnel: 4,
      title: "방제목",
      date: "23.01.24",
      secret: false
    },
    {
      id: 6,
      Participant: 2,
      personnel: 4,
      title: "방제목",
      date: "23.01.24",
      secret: false
    },
    {
      id: 7,
      Participant: 2,
      personnel: 4,
      title: "비밀방3",
      date: "23.01.24",
      secret: true
    },
    {
      id: 8,
      Participant: 2,
      personnel: 4,
      title: "방제목",
      date: "23.01.24",
      secret: false
    },
    {
      id: 9,
      Participant: 2,
      personnel: 4,
      title: "방제목",
      date: "23.01.24",
      secret: false
    },
    {
      id: 10,
      Participant: 2,
      personnel: 4,
      title: "방제목",
      date: "23.01.24",
      secret: false
    },{
    id: 11,
    Participant: 2,
    personnel: 4,
    title: "비밀방1",
    date: "23.01.24",
    secret: true
  },
  {
    id: 12,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
    secret: false
  },
  {
    id: 13,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
    secret: false
  },
  {
    id: 14,
    Participant: 2,
    personnel: 4,
    title: "비밀방2",
    date: "23.01.24",
    secret: true
  },
  {
    id: 15,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
    secret: false
  },
  {
    id: 16,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
    secret: false
  },
  {
    id: 17,
    Participant: 2,
    personnel: 4,
    title: "비밀방3",
    date: "23.01.24",
    secret: true
  },
  {
    id: 18,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
    secret: false
  },
  {
    id: 19,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
    secret: false
  },
  {
    id: 20,
    Participant: 2,
    personnel: 4,
    title: "방제목",
    date: "23.01.24",
    secret: false
  },
  ];

function Pagination() {
    // 전체데이터, 현재페이지, 페이지당 포스트갯수
    const [dumyData, setDumyData] = useState(DUMMY_DATA);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    //현재 페이지에 렌더할 데이터를 추출하기위한 값들
    const lastPostIndex = currentPage * postsPerPage; //렌더할 페이지에 해당하는 마지막 인덱스값
    const firstPostIndex = lastPostIndex - postsPerPage; //렌더할 페이지에 해당하는 첫번째 인덱스값
    const currentPosts = dumyData.slice(firstPostIndex, lastPostIndex); //현재 페이지에서 렌더할 데이터항목
    
    return(
        <>
        <PageBar
        totalPosts={dumyData.length} //전체 데이터 길이
        postsPerPage={postsPerPage}  //페이지당 게시물 수
        setCurrentPage={setCurrentPage} //현재 페이지를 계산하는 함수
        currentPage={currentPage} //현재페이지
        />
        <PagePost dumyData={currentPosts}/>
        </>
    )
}
export default Pagination;