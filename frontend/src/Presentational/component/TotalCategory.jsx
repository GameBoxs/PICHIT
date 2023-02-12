import styled from "styled-components";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { BiSearch } from "react-icons/bi";

function TotalCategory(props) {
  //검색
  const [search, setSearch] = useState("");
  function onChangeSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  function onSearch(e) {
    e.preventDefault();
    props.searchHandler(search);
  }
  function clearSearch() {
    setSearch("");
    props.searchHandler("");
  }

  //sort선택
  function sortSelect(e) {
    props.sortHandler(e);
  }

  return (
    <div>
      <SearchWrapper>
        <SearchForm onSubmit={(e) => onSearch(e)}>
          <InputBox>
            <div class="search__icon">
              <BiSearch />
            </div>
            <input
              type="text"
              value={search}
              onChange={onChangeSearch}
              placeholder="검색어를 입력해주세요"
            />
            <RemoveBtn>
              {search ? (
                <MdCancel color="gray" size={23} onClick={clearSearch} />
              ) : null}
            </RemoveBtn>
          </InputBox>
        </SearchForm>
      </SearchWrapper>
      <SortCartegory>
        <SortBtn
          onClick={() => {
            sortSelect("");
          }}
        >
          등록 순
        </SortBtn>
        <SortBtn
          onClick={() => {
            sortSelect("title");
          }}
        >
          가나다 순
        </SortBtn>
        <SortBtn
          onClick={() => {
            sortSelect("startDate");
          }}
        >
          날짜 순
        </SortBtn>
      </SortCartegory>
    </div>
  );
}

export default TotalCategory;

const SearchWrapper = styled.div``;

const SearchForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1.5rem;
  padding-right: 3rem;
`;
const InputBox = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
  border-radius: 1.625rem;
  grid-row: 2 / 3;
  grid-column: 3 / 4;

  input {
    display: flex;
    width: 95%;
    height: 4rem;
    border: none;
    border-radius: 1rem;
    font-size: 1.4rem;
    padding-left: 3.8rem;
    box-shadow: inset 0.2rem 0.2rem 0.5rem var(--greyLight-2),
      inset -0.2rem -0.2rem 0.5rem var(--white);
    background: none;
    font-family: inherit;
    color: var(--greyDark);
    &:focus {
    outline: none;
    box-shadow: 
      0.3rem 0.3rem 0.6rem var(--greyLight-2),
      -0.2rem -0.2rem 0.5rem var(--white);

    + .search__icon {
      color: var(--primary);
    }
  }

  }
  &::placeholder {
    color: var(--greyLight-3);
  }
  
  .search__icon {
    height: 1rem;
    position: absolute;
    font-size: 2rem;
    padding: 0 1rem;
    display: flex;
    color: var(--greyDark);
    transition: 0.3s ease;
  }
`;
const RemoveBtn = styled.div`
  display: flex;
  margin: auto;
`;
const SortCartegory = styled.div`
  margin: 15px 0px;
`;

const SortBtn = styled.button``;
