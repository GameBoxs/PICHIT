import styled from "styled-components";


function MyCategory({conditionHandler}) {
  //sort
  function sortSelect(e){
    conditionHandler(e, "finished")
  }

  return(
    <SortCartegory>
      <SortBtn onClick={()=>{sortSelect('')}}>모든 방</SortBtn>
      <SortBtn onClick={()=>{sortSelect('0')}}>시작 예정</SortBtn>
      <SortBtn onClick={()=>{sortSelect('1')}}>완료된 방</SortBtn>
    </SortCartegory>
  )
}

export default MyCategory;

const SortCartegory = styled.div`
`;

const SortBtn = styled.button`
  `