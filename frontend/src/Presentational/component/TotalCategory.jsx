import styled from "styled-components";
import { useState} from "react";
import {MdCancel} from 'react-icons/md';

function TotalCategory(props) {
        //////////////////  <<<  검색창  >>>>  ////////////////
    //검색창
    // function searchHandler(e){
    //   e.preventDefault();
    //   props.searchInput(e.target.value)
    // }

    // //제출
    // function onSearch(e){
      

    // }
    const [search, setSearch]=useState("");
    function onChangeSearch(e){
      e.preventDefault();
      setSearch(e.target.value);
    }
    function onSearch(e){
      e.preventDefault();
      props.searchHandler(search)
    }
    function clearSearch(){
      setSearch("")
      props.searchHandler("")
    }

  return (
    <div>
      <SearchWrapper>
        <SearchForm onSubmit={e=>onSearch(e)}>
          <InputBox>
            <input
              type="text"
              value={search}
              onChange={onChangeSearch}
              placeholder="검색어를 입력해주세용"
            />
            <RemoveBtn>
              {search ? <MdCancel color="gray" size={23} onClick={clearSearch}/>:null}
            </RemoveBtn>
          </InputBox>
          <SubmitBtm type="submit">검색</SubmitBtm>
        </SearchForm>
        
      </SearchWrapper>
      <SortCartegory>
        <button>모든 방</button>
        <button>입장가능</button>
        <button >날짜 순</button>
      </SortCartegory>
      
    </div>
  );
}

export default TotalCategory;

const SearchWrapper = styled.div`
  `;

const SearchForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1.5rem;
  padding-right: 3rem;
  `
  const InputBox = styled.div`
    display: flex;
    width: 100%;
    background: #e8e8e8;
    /* background-color: green; */
    align-items: center;
    border-radius: 1.625rem;
    input{
    width: 93%;
    height: 2.5rem;
    background: #e8e8e8;
    outline: none;
    border: none;
    border-radius: 1.625rem;
    padding: 0rem 3.5rem 0rem 1.5rem;
    font-size: 1rem;
  }
  `
  const RemoveBtn = styled.div`
   display: flex;
   margin: auto
    
  `
  const SubmitBtm = styled.button`
    margin: 0% 1rem;
  `
  const SortCartegory = styled.div`
      margin: 15px 0px;
  `;