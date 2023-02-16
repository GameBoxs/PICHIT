import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import React from "react";

// { setCurrentPage, currentPage, totalpages, step } : 현재페이지state함수, 현재페이지, 전체페이지수, 한 챕터에 나타낼 페이지수
function PageBar({ setCurrentPage, currentPage, totalpages, step }) {
  const steps = Number(step); //  한 챕터에 나타낼 페이지수
  const mainOrReview = steps === "5" ? true : false; // 메인이랑 복기페이지를 구분해 Bar길이 조정을 위함

  // 한 챕터 당 페이지번호의 최대최소
  const [page, setPage] = useState({
    min: 1,
    max: steps,
  });
  const fit = steps < totalpages; //false:페이지 더보기 없게, true:페이지 더보기 존재
  
  // 초기 페이지네이션으로 초기화(카테고리 및 정렬 선택시 활용) 
  if(currentPage === 1  && page.min !== 1){
    setPage(() => {
      return {
        min: 1,
        max: steps
      };
    });
  }

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

  //챕터 이동 함수(앞으로)
  function prev() {
    const prevtmp =
      Math.floor((Number(currentPage) - 1) / steps) * steps + 1 - steps;
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

  //챕터 이동 함수(뒤로)
  function next() {
    const nexttmp =
      Math.floor((Number(currentPage) - 1) / steps) * steps + 1 + steps;
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

  //현재 챕터가 최소,최대 챕터인지 나타내는 state (버튼 비활성화를 위해)
  const [firstPage, setFirstPage] = useState(false);
  const [lastPage, setLastPage] = useState(false);

  //현재 챕터 위치 변경 함수
  useEffect(() => {
    // 데이터가 아예 없는 경우
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
        {fit && (
          <GrFormPrevious
            onClick={prev}
            className={firstPage ? "Head" : "Prev"}
          />
        )}
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
        {fit && (
          <GrFormNext onClick={next} className={lastPage ? "Tail" : "Next"} />
        )}
      </PagenationBar>
    </>
  );
}
export default React.memo(PageBar);

const Bar = styled.div`
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

  polyline {
    stroke: var(--primary-light);
  }
  .Prev {
    font-size: 50px;
    cursor: pointer;
  }
  .Head {
    font-size: 50px;
    polyline {
      stroke: var(--greyLight-2);
    }
  }
  .Next {
    font-size: 50px;
    cursor: pointer;
  }
  .Tail {
    font-size: 50px;
    polyline {
      stroke: var(--greyLight-2);
    }
  }
`;
