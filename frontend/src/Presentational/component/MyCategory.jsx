import styled from "styled-components";


function MyCategory(props) {
  //sort
  function sortSelect(e){
    props.finishedHandler(e)
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
margin: 15px 0px;
`;
const SortBtn = styled.button`
  `