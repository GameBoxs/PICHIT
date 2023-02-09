import React, { useEffect, useState, useLayoutEffect } from "react";

import styled from "styled-components";
import Title from "../../common/Title";

function RoomHeaderLoading() {
  
  return (
    <Layout>
      <Title title={""} />
    </Layout>
  );
}

export default RoomHeaderLoading;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LayoutButton = styled.div`
  width: 10vw;
  height: 8vh;
`;

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
