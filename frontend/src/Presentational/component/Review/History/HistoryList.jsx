import React, { memo } from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

import ListItem from "./ListItem";
import PageBar from "../../../common/Pagination/PageBar";
import Loading from '../../../common/Loading'

import useAxios from "../../../../action/hooks/useAxios";
import { useSelector } from "react-redux";

const HistoryList = ({ setSelectedID }) => {
  const token = useSelector((state) => state.token);

  const [data, setData] = useState();
  const [nowPage, setNowPage] = useState(1);
  const [nowPageElements, setNowPageElements] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [getData, isLoading] = useAxios(
    `my-interviewjoins?size=5&page=${nowPage - 1}&finished=1`,
    "GET",
    token
  );
  const [currentPosts, setCurrentPosts] = useState();

  useEffect(() => {
    if (getData && getData.data) {
      setData(getData);
      setCurrentPosts(getData.data.content);
      setTotalPage(getData.data.totalPages);
      setNowPageElements(getData.data.numberOfElements);
    }
  }, [getData]);

  // console.log('HistoryList data');
  // console.log(data);
  // console.log('HistoryList currentPosts');
  // console.log(currentPosts);
  let blankPosts = new Array(5 - nowPageElements).fill({
    item: { title: "", startDate: "" },
  });
  // console.log(nowPage,totalPage);

  return (
    <HistoryContainer>
      {isLoading && data === undefined ? (
        <Loading/>
      ) : currentPosts !== undefined ? (
        <>
          <ListBody>
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
