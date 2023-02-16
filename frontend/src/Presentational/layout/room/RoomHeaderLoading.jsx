import React from "react";
import { memo } from "react";

import styled from "styled-components";
import Title from "../../common/Title";

//로딩일 때 룸헤더 위치에 보이는 컴포넌트
function RoomHeaderLoading() {
  return (
    <Layout>
      <Title title={""} />
    </Layout>
  );
}

export default memo(RoomHeaderLoading);

const Layout = styled.div`
  margin-bottom: 3rem;

  & .Title {
    font-size: 2.5rem;
    text-align: left;
    margin-block: 3rem;
    font-family: 'SBAggroL';
  }

  .Btn {
    width: 10rem;
    height: 3.5rem;

    & * {
      font-size: 1rem;
    }
  }
`;
