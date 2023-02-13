import styled, { css } from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import React from 'react'
import PageZero from "./PageZero"
import Pagination from "./Pagination"

//전체 데이터 길이, 페이지당 게시물 수, 현재 페이지를 계산하는 함수, 현재페이지
function PageBar({ setCurrentPage, currentPage, totalpages, step}) {
  const steps = Number(step); // 한챕터당 페이지수
  const mainOrReview = steps === '5' ? true : false; //메인이랑 복기 Bar길이를 위함
  const [page, setPage] = useState({
    min: 1,
    max: steps,
  });
  const fit=(steps<totalpages);//false:페이지 더보기 없게, true:페이지 더보기 존재
  // console.log('렌더링 확인용:::::'+steps)

  // 챕터 리스트 생성
  let pages = [];
    for (let i = page.min; i <= page.max; i++) {
      pages.push(i);
      if (totalpages === 0) {
        break;
      }
      if (i === totalpages) {
        break;
      }
    }


  //챕터 이동 함수
  function prev() {
    const prevtmp = Math.floor((Number(currentPage) - 1) / steps) * steps + 1 - steps;
    if (prevtmp >= 1) {
      setCurrentPage(prevtmp);
      setPage(() => {
        return {
          min: prevtmp,
          max: prevtmp + steps - 1,
        };
      });
    }
  }
  
  function next() {
    const nexttmp = Math.floor((Number(currentPage) - 1) / steps) * steps + 1 + steps;
    if (nexttmp <= totalpages) {
      setCurrentPage(nexttmp);
      setPage(() => {
        return {
          min: nexttmp,
          max: nexttmp + steps - 1,
        };
      });
    }
  }

  //현재 챕터 위치(버튼 비활성화를 위해)
  const [firstPage, setFirstPage] = useState(false);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    if (totalpages === 0) {
      setLastPage(true);
      setFirstPage(true);
    }

    //그외
    else {
      //첫 장이면
      pages.includes(1) ? setFirstPage(true) : setFirstPage(false);
      //마지막 장이면
      pages.includes(totalpages) ? setLastPage(true) : setLastPage(false);
    }
  }, [pages]);


  return (
    <>
      <PagenationBar>
        {
          fit&&<GrFormPrevious onClick={prev} className={firstPage ? "Head":"Prev"}/>
        }
        {/* <GrFormPrevious onClick={prev} className={firstPage ? "Head":"Prev"}/> */}
        <Bar className="paginationBar" length={mainOrReview}>
          {pages.map((page, index) => {
            return (
              <Button
              key={index}
              onClick={() => setCurrentPage(page)}
              active={page === currentPage ? true : false}
              ></Button>
              );
            })}
        </Bar>
        {
          fit&&<GrFormNext onClick={next} className={lastPage?"Tail":"Next"}/>
        }
        {/* <GrFormNext onClick={next} className={lastPage?"Tail":"Next"}/> */}
      </PagenationBar>
    </>
  );
}
export default React.memo(PageBar);

const Bar = styled.div`
  /* border: solid 2px skyblue; //pagination영역을 위한 border: ; */
  width: ${(props) => (props.length ? "260px" : "500px")};
  height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 1em;
  margin-right: 20px;
  border: none;
  background-color: var(--primary);
  cursor: pointer;
  transition: 0.3s ease width;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background: var(--primary-dark);
    cursor: pointer;
  }

  ${(props) =>
    props.active &&
    css`
      width: 50px !important;
      cursor: auto;
    `};
`;

const PagenationBar = styled.div`
  display: flex;
  align-items: center;
  /* border: solid 2px skyblue; */
  .Prev {
    font-size: 50px;
    cursor: pointer;
  }
  .Head {
    font-size: 50px;
    polyline {
      stroke: #b6b6b6;
    };
  }
  .Next {
    font-size: 50px;
    cursor: pointer;
  }
  .Tail {
    font-size: 50px;
    polyline {
      stroke: #b6b6b6;
    };
  }
  ;
`;
