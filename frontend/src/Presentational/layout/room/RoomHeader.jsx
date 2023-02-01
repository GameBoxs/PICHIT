import styled from "styled-components";
import Title from "../../common/Title";
import PlanTime from "../../component/PlanTime";

import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import EditRoom from "../../component/EditRoom";

const MySwal = withReactContent(Swal);

function RoomHeader({ join, joinRoom, title, date, host }) {
  const showSwalWithLink = () => {
    MySwal.fire({
      title: "방 수정하기",
      width: 800,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "수정하기",
      cancelButtonText: "취소",
      html: (
        <div>
          <EditRoom />
        </div>
      ),
    });
  };

  const joinHandler = () => {
    joinRoom(!join);
  };

  return (
      <Layout>
          <Title title={title} />
        {host ? ( // host 인지 아닌지 판별
          <LayoutButton text={"수정하기"} onClick={showSwalWithLink} isImportant={false}>수정하기</LayoutButton>
        ) : join ? (
          <LayoutButton text={"나가기"} isImportant={false}>나가기</LayoutButton>
        ) : (
          <LayoutButton text={"참여하기"} onClick={joinHandler} isImportant={false}>참여하기</LayoutButton>
        )}
      </Layout>
  );
}

export default RoomHeader;

const LayoutButton = styled.div`

width: 10vw;
  height: 8vh;
  border-radius: 1rem;
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2),
    -0.2rem -0.2rem 0.5rem var(--white);
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;
  font-weight: 600;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  background-color: var(--primary-light);

  & {
    color: var(--white);
  }

  &:hover {
    color: var(--primary);
  }

  &:active {
    box-shadow: inset .2rem .2rem .5rem var(--greyLight-2), inset -.2rem -.2rem .5rem var(--white);
  }
  `

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;

  & .Title {
    font-weight: 600;
    font-size: 3rem;
  }

  & div:nth-child(2) {
    width: 7rem;
    height: 3rem;

    & * {
      font-size: 1rem;
    }
  }
`;