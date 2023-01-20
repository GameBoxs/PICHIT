import styled from "styled-components";


function MyCategory(paams) {
  //       //////////////////  <<<  검색창  >>>>  ////////////////
  //   //검색창
  //   const handleChange = (content) => {
  //       console.log(content.target.value);
  //   };
    
  //   //필터
  //   function orderDate() {
  //   }

  // return (
  //   <div>
  //     <SearchWrapper>
  //       <input
  //         type="text"
  //         className="search-input"
  //         onChange={handleChange}
  //         placeholder="검색어를 입력해주세용"
  //       />
  //     </SearchWrapper>
  //     <div>
  //       <button>모든 방</button>
  //       <button>입장가능</button>
  //       <button onClick={orderDate}>날짜 순</button>
  //     </div>
  //   </div>
  // );
  return(
    <SortCartegory>
      <button>모든 방</button>
      <button>시작 예정</button>
      <button>완료된 방</button>
    </SortCartegory>
  )
}

export default MyCategory;

const SortCartegory = styled.div`
margin: 15px 0px;
`;