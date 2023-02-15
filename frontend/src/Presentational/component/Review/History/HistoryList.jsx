import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";

import ListItem from "./ListItem";
import PageBar from "../../../common/Pagination/PageBar";
import Loading from '../../../common/Loading'

import useAxios from "../../../../action/hooks/useAxios";
import { useSelector } from "react-redux";

// 복기하고 싶은 면접방 선택할 수 있게 하는 영역
const HistoryList = ({ setSelectedID }) => {
  const token = useSelector((state) => state.token);

  //리스트 불러오기
  const [data, setData] = useState();
  
  //pagination
  const [nowPage, setNowPage] = useState(1);
  const [nowPageElements, setNowPageElements] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPosts, setCurrentPosts] = useState();

  //리스트 불러오는 useAxios
  const [getData, isLoading] = useAxios(
    `my-interviewjoins?size=5&page=${nowPage - 1}&finished=1`,
    "GET",
    token
  );

  //리스트 불러온 후 pagination 설정
  useEffect(() => {
    if (getData && getData.data) {
      setData(getData);
      setCurrentPosts(getData.data.content);
      setTotalPage(getData.data.totalPages);
      setNowPageElements(getData.data.numberOfElements);
    }
  }, [getData]);

  // 공백 처리
  let blankPosts = new Array(5 - nowPageElements).fill({
    item: { title: "", startDate: "" },
  });

  return (
    <HistoryContainer>
      {/* 로딩이 완전히 되지 않았거나 데이터를 받아오지 못한 경우 */}
      {isLoading && data === undefined ? (
        <Loading/>
      ) : currentPosts !== undefined ? (
        // 현재 포스트에 데이터가 있을 경우
        <>
          <ListBody>
            {/* 현재 포스터 리스트 불러오기 */}
            {currentPosts.map((item, index) => {
              return (
                <ListItem
                  item={item.interviewRoom}
                  startedTime={item.startedTime}
                  key={index}
                  index={index}
                  cursor="pointer"
                  setSelectedID={setSelectedID}
                  myID={item.interviewJoinId}
                />
              );
            })}
            {blankPosts.map((item, idx) => {
              return (
                <ListItem item={item} key={idx} cursor="default" />
              );
            })}
          </ListBody>

          {/* Pagination */}
          <PaginationBox>
            <PageBar
              totalpages={totalPage}
              setCurrentPage={setNowPage}
              currentPage={nowPage}
              step='5'
            />
          </PaginationBox>
        </>
      ) : (
        <Loading/>
      )}
    </HistoryContainer>
  );
};

const ListBody = styled.div`
  width: 100%;
  height: fit-content;
`;

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default memo(HistoryList);
