import styled from "styled-components";
import { memo, useEffect, useState } from "react";
import useAxios from "../../../../action/hooks/useAxios";
import { useSelector } from "react-redux";

import SubTitle from "../../../common/SubTitle";
import FeedBackArea from "./FeedBack/FeedBackArea";
import SoundArea from "./SoundArea";
import PageBar from "../../../common/Pagination/PageBar";

const DetailArea = ({ selectedID }) => {
  const token = useSelector((state) => state.token);

  const [data, setData] = useState();
  const [nowPage, setNowPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [getData, isLoading] = useAxios(
    `interviewjoins/${selectedID}/questions?size=2000`,
    "GET",
    token,
    null,
    selectedID ? true : false
  );

  useEffect(() => {
    if (getData && getData.success && getData.data) {
      setData(getData.data.content);
      setTotalPage(getData.data.totalElements);
    }
  }, [getData]);

  useEffect(() => {
    setNowPage(1);
  }, [selectedID]);

  return (
    <DetailWrap>
      <SubTitle title="면접 피드백" />
      <Container>
        {selectedID && data ? (
          isLoading === true ? (
            <div>loading...</div>
          ) : (
            <>
              <SoundArea />
              <PageBar
                setCurrentPage={setNowPage} //현재 페이지를 계산하는 함수
                currentPage={nowPage} //현재페이지
                totalpages={totalPage}
              />
              <FeedBackArea
                title={data[nowPage - 1].content}
                data={data[nowPage - 1].feedbacks}
              />
            </>
          )
        ) : (
          /* <FeedBackArea title={currentPost.question} data={currentPost.reviews}/> */
          <NullCompo>기록을 선택해주세요</NullCompo>
        )}
      </Container>
    </DetailWrap>
  );
};

export default memo(DetailArea);

const Container = styled.div`
  min-height: 400px;
  height: fit-content;
  background-color: var(--greyLight-1);
  border-radius: 3rem;
  margin-top: 1rem;
  padding : 2rem 4rem;

  .paginationBar {
    height: 1em;

    * {
      height: 0.6em;
      width: 0.6em;
      margin-right: 0.6em;
      background-color: var(--primary-light);
    }
  }
`;

const NullCompo = styled.div`
  width: inherit;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

const DetailWrap = styled.div`
  width: 100%;
  margin-bottom: 50px;

  & > div:first-child {
    font-size: 1.3rem;
    font-family: SBagrroM;
    color: var(--primary-light);
    padding: 1.4rem 1rem 1rem 1rem;
    /* border-bottom: solid 2px var(--greyDark); */
  }

  & > div:nth-child(4) {
    margin-top: 50px;
  }
`;