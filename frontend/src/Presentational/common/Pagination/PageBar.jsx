import styled, { css } from "styled-components";

//전체 데이터 길이, 페이지당 게시물 수, 현재 페이지를 계산하는 함수, 현재페이지
function PageBar({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) {
  // paginationBar에 총 몇페이지가 나올지 계산해서 렌더링해주기 위함
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <Bar>
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
    </>
  );
}

export default PageBar;

const Bar = styled.div`
  border: solid 2px skyblue; //pagination영역을 위한 border: ;
  width: 100%;
  height: 23px;
  display: flex;
  justify-content: center
`;

const Button = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  margin-right: 20px;
  border: none;
  background-color: #aeaeae;
  cursor: pointer;
  transition: 0.3s ease width;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    background: #676767;
    cursor: pointer;
  }
  ${(props) =>
    props.active &&
    css`
      width: 50px;
      cursor: auto;
    `};
`;
