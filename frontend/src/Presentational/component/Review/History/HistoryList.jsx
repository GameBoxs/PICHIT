import React, { memo } from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

import ListItem from "./ListItem";
import PageBar from "../../../common/Pagination/PageBar";

import useAxios from "../../../../action/hooks/useAxios";
import { useSelector } from "react-redux";

const HistoryList = ({setSelectedID}) => {
  // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcGVha29uIiwibmFtZSI6IuydtO2drOyImCIsImlkIjoxLCJleHAiOjE2NzY1NTY2ODcsImlhdCI6MTY3NDc0MjI4NywidXNlcklkIjoia2FrYW9fMjYyOTgzOTQ2MiJ9.TxhacA4jIPlIJLQt8Dlz5Xl-loXmfhtnnUOofpBAUnO8IT2e3t5vi_KY-yQ194QMcI4l7bLHKL5EIUqsnVCWAg'
  const token = useSelector(state => state.token);
  // console.log(token);

  const [data, setData] = useState();
  const [nowPage, setNowPage] = useState(1);
  const [nowPageElements, setNowPageElements] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [getData, isLoading] = useAxios(`my-interviewjoins?size=5&page=${nowPage-1}&finished=1`,'GET',token);
  const [currentPosts, setCurrentPosts] = useState();
  
  useEffect(() => {
    if(getData && getData.data){
      setData(getData); 
      setCurrentPosts(getData.data.content);
      setTotalPage(getData.data.totalPages);
      setNowPageElements(getData.data.numberOfElements);
    }
  },[getData]);

  // console.log('HistoryList data');
  // console.log(data);
  // console.log('HistoryList currentPosts');
  // console.log(currentPosts);
  let blankPosts = new Array(5-nowPageElements).fill({item:{title:"",startDate:""}});
  // console.log(blankPosts);

  return (
    <>
      {
        isLoading && data===undefined ? <div>Loading..</div> :
        currentPosts!==undefined?
        <>
          <ListBody>
            <Line></Line>
            {currentPosts.map((item, index) => {
              return (
                <ListItem
                  item={item.interviewRoom}
                  key={index}
                  index={index}
                  cursor="pointer"
                  setSelectedID={setSelectedID}
                  myID = {item.interviewJoinId}
                />
              );
            })
            }
            {
              blankPosts.map((item,idx) => {
                return (
                  <ListItem item={item} key={idx} index={idx} cursor="default"/>
                )
              })
            }
          </ListBody>
          <PageBar
            totalpages={totalPage}
            setCurrentPage={setNowPage}
            currentPage={nowPage}
          />
        </> : <div>Loading..</div>
      }
    </>
  );
};

const ListBody = styled.div`
  width: 100%;
  height: 450px;
  & hr {
    opacity: 0.2;
    :first-child, :last-child {
      display: none;
    }
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

export default memo(HistoryList);
