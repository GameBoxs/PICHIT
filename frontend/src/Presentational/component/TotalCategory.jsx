import styled from "styled-components";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { BiSearch } from "react-icons/bi";

function TotalCategory({ conditionHandler }) {
  //검색
  const [search, setSearch] = useState("");

  function onChangeSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  function onSearch(e) {
    e.preventDefault();
    conditionHandler(search, "search");
  }

  function clearSearch() {
    setSearch("");
    conditionHandler("", "search");
  }

  //sort선택
  function sortSelect(e) {
    conditionHandler(e, "sort");
  }

  const MenuObj = [
    { type: "등록순", handler: "" },
    { type: "가나다순", handler: "title" },
    { type: "날짜 순", handler: "startDate" },
  ];

  const Menu = MenuObj.map((elem, idx) => {
    return (
      <React.Fragment key={idx}>
        <input
          type="radio"
          name={`radio`}
          id={`tab-${idx + 1}`}
          onClick={() => sortSelect(elem.handler)}
        />
        <label htmlFor={`tab-${idx + 1}`}>
          <p>{elem.type}</p>
        </label>
      </React.Fragment>
    );
  });

  return (
    <div>
      <SearchWrapper>
        <SearchForm onSubmit={(e) => onSearch(e)}>
          <InputBox>
            <div className="search__icon">
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
      <MenuCompo>
        {Menu}
        <MenuColor />
      </MenuCompo>
    </div>
  );
}

export default TotalCategory;

const MenuColor = styled.div``;

const MenuCompo = styled.div`
  padding: 0.5rem;
  width: fit-content;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  margin-bottom: 1rem;
  border-radius: 1rem !important;
  display: flex;
  align-items: center;
  position: relative;
  background-color: var(--greyLight-1);
  box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2),
    -0.2rem -0.2rem 0.5rem var(--white);

  & input {
    display: none;
  }

  & > input:checked + label {
    transition: all 0.5s ease;
    color: var(--primary);
  }

  & label {
    width: 5rem;
    height: 2rem;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s ease;
    
    &:hover {
      color: var(--primary);
    }
    
    p {
      color: var(--greyDark);
    }
  }

  ${MenuColor} {
    position: absolute;
    height: 2rem;
    width: 5rem;
    border-radius: 0.8rem !important;
    box-shadow: inset 0.2rem 0.2rem 0.5rem var(--greyLight-2),
      inset -0.2rem -0.2rem 0.5rem var(--white);
    pointer-events: none;
  }

  #tab-1:checked ~ ${MenuColor} {
    transform: translateX(0);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  #tab-2:checked ~ ${MenuColor} {
    transform: translateX(5rem);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  #tab-3:checked ~ ${MenuColor} {
    transform: translateX(10rem);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;

const SearchWrapper = styled.div``;

const SearchForm = styled.form`
  width: 100%;
  margin: 1.5rem 1.5rem 1.5rem 0;
  padding-right: 3rem;
`;

const InputBox = styled.div`
 display: flex;
  width: 100%;
  position: relative;
  align-items: center;
  border-radius: 2rem;
  grid-row: 2 / 3;
  grid-column: 3 / 4;

  input {
    display: flex;
    width: 100%;
    margin-right: 1rem;
    height: 3rem;
    border: none;
    border-radius: 1rem;
    font-size: 1rem;
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

  input::placeholder {
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

  path {
    color: var(--primary);
  }
`;
