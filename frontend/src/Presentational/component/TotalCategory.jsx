import styled from "styled-components";


function TotalCategory(paams) {
        //////////////////  <<<  검색창  >>>>  ////////////////
    //검색창
    const handleChange = (content) => {
        console.log(content.target.value);
    };
    
    //필터
    function orderDate() {
    }

  return (
    <div>
      <SearchWrapper>
        <input
          type="text"
          className="search-input"
          onChange={handleChange}
          placeholder="검색어를 입력해주세용"
        />
        <button>검색</button>
      </SearchWrapper>
      <SortCartegory>
        <button>모든 방</button>
        <button>입장가능</button>
        <button onClick={orderDate}>날짜 순</button>
      </SortCartegory>
      
    </div>
  );
}

export default TotalCategory;

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  input{
    width: 100%;
    height: 2.5rem;
    background: #f5f5f5;
    outline: none;
    border: none;
    border-radius: 1.625rem;
    padding: 0 3.5rem 0 1.5rem;
    font-size: 1rem;
  }
  `;

const SortCartegory = styled.div`
    margin: 15px 0px;
`;