import React from "react";
import styled from "styled-components";
import ListItem from "./ListItem";

const HistoryList = ({data}) => {
    return (
        <ListBody>
            {
                data.map((item, index) => {
                  return (
                    <ListItem item={item} key={index} index={index} lastIndex={data.length-1}></ListItem>
                  )
                })
            }
            <HistoryPagenationArea>
                <span>&lt; 1 2 3 4 ... 10 &gt;</span>
            </HistoryPagenationArea>
        </ListBody>
    )
}

const ListBody = styled.div`
    width: 100%;
    & hr{
        opacity: 0.2;
    }
`

const HistoryPagenationArea = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 50px;
  span {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
`

export default HistoryList;