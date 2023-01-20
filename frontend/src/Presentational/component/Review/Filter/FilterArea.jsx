import React from "react";
import Button from "../../../common/Button";
import styled from "styled-components";

const FilterArea = () => {
    return (
        <FilterWrap>
            <Button text="모두 보기"></Button>
            <Button text="진행중"></Button>
            <Button text="시작 예정"></Button>
            <Button text="스터디 종료"></Button>
        </FilterWrap>
    )
}

const FilterWrap = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  
  padding: 0 15px 0 15px;
  align-content: center;

  // 나중에 버튼 수정되면 삭제할 부분
  & * {
    margin: 0;
    margin-top: auto;
  }
  /////////////////////////////////

  & div:nth-child(1), div:nth-child(2), div:nth-child(3) {
    margin-right: 15px;
  }
`

export default FilterArea;