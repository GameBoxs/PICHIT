import React from "react";
import styled from "styled-components";
import PageBar from "../../common/Pagination/PageBar";
import PageZero from "../../common/Pagination/PageZero";
import BoardBodyBottom from "./BoardBodyBottom";
import BoardList from "./BoardList";
import BoardHeader from "./BoardHeader";

function BoardBody(props) {
  const {
    roomPosition,
    conditionHandler,
    data,
    aboutCondition,
    totalpages,
    currentPage,
    setCurrentPage,
  } = props;

  return (
    <section>
      <Main>
        <BoardHeader
          roomPosition={roomPosition}
          conditionHandler={conditionHandler}
        />

        <BoardList
          data={data}
          aboutCondition={aboutCondition}
          roomPosition={roomPosition}
        />
    
        <PaginationBox>
          {totalpages === 0 ? (
            <PageZero />
          ) : (
            <PageBar
              setCurrentPage={setCurrentPage} //현재 페이지를 계산하는 함수
              currentPage={currentPage} //현재페이지
              totalpages={totalpages} //페이지 길이
              step='5'
            />
          )}
        </PaginationBox>
      </Main>

      <BoardBodyBottom />
    </section>
  );
}

export default BoardBody;
const Main = styled.div`
  margin: 0;
  .search-input {
    width: 100%;
    margin-block: 2rem 1.5rem;
  }
`;

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
