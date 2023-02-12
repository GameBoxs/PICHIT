import styled, { css } from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import React from 'react'
import PageZero from "./PageZero"
import Pagination from "./Pagination"

//전체 데이터 길이, 페이지당 게시물 수, 현재 페이지를 계산하는 함수, 현재페이지
function PageBar({ setCurrentPage, currentPage, totalpages }) {
  const step = 10; // 한챕터당 페이지수
  const mainOrReview = step === 5 ? true : false; //메인이랑 복기 Bar길이를 위함
  const [page, setPage] = useState({
    min: 1,
    max: step,
  });

  // console.log("pagebar");

  // 챕터 리스트 생성
  let pages = [];
    for (let i = page.min; i <= page.max; i++) {
      pages.push(i);
      if (totalpages === 0) {
        console.log('여기 들어오냐')
        break;
      }
      if (i === totalpages) {
        break;
      }
    }
    // console.log("pagebar"+pages);


  //챕터 이동 함수
  function prev() {
    const prevtmp = Math.floor((currentPage - 1) / step) * step + 1 - step;
    if (prevtmp >= 1) {
      setCurrentPage(prevtmp);
      setPage(() => {
        return {
          min: prevtmp,
          max: prevtmp + step - 1,
        };
      });
    }
  }
  
  function next() {
    const nexttmp = Math.floor((currentPage - 1) / step) * step + 1 + step;
    if (nexttmp <= totalpages) {
      setCurrentPage(nexttmp);
      setPage(() => {
        return {
          min: nexttmp,
          max: nexttmp + step - 1,
        };
      });
    }
  }

  //현재 챕터 위치(버튼 비활성화를 위해)
  const [firstPage, setFirstPage] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  // const [edgePage, setEdgePage] = useState({
  //   first:false,
  //   last:false,
  // })

  useEffect(() => {
    // console.log("여긴가3333");
    //데이터가 없는경우(totalpages===0)
    if (totalpages === 0) {
      setLastPage(true);
      setFirstPage(true);
    // console.log("여긴가444");
    }

    //그외
    else {
    // console.log("여긴가5555");
      //첫 장이면
      pages.includes(1) ? setFirstPage(true) : setFirstPage(false);
      //마지막 장이면
      pages.includes(totalpages) ? setLastPage(true) : setLastPage(false);
    }
  }, [pages]);


  return (
    <>
      <PagenationBar>
        <GrFormPrevious onClick={prev} className={firstPage ? "Head":"Prev"} />
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
          <GrFormNext onClick={next} className={lastPage?"Tail":"Next"} />
      </PagenationBar>
    </>
  );
}
export default React.memo(PageBar);

const Bar = styled.div`
  /* border: solid 2px skyblue; //pagination영역을 위한 border: ; */
  width: ${(props) => (props.length ? "250px" : "500px")};
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

  .Prev {
    font-size: 50px;
    cursor: pointer;
  }
  .Head {
    font-size: 50px;
    polyline {
      stroke: #b6b6b6;
    }
  }
  .Next {
    font-size: 50px;
    cursor: pointer;
  }
  .Tail {
    font-size: 50px;
    polyline {
      stroke: #b6b6b6;
    }
  }
`;
