import styled from "styled-components";
import Title from "../../../common/Title";
import SubTitle from "../../../common/SubTitle";

const ListItem = (props) => {
    let CurrentState = "";
  
    if(props.item.Processing==="Y") {
      CurrentState = "진행중";
    } else if(props.item.Processing==="N") {
      CurrentState = "진행 예정";
    } else if(props.item.Processing==="E") {
      CurrentState = "종료";
    }
  console.log(props.item)
    return(
      <>
        {/* <Line></Line> */}
            <ItemWrap>
            <Title title={props.item.Title}></Title>
            <SubTitle title={props.item.Day}></SubTitle>
            <SubTitle title={CurrentState}></SubTitle>
            {props.item.Title !=="" && props.item.Title !== null && props.item.Title !== undefined ? <SubTitle title=">"></SubTitle> : null }
            </ItemWrap>
            <Line></Line>
        {/* {props.index === props.postsPerPage-1 || props.index+1 === ""? <Line></Line> : null} */}
      </>
    )
  }

  const ItemWrap = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    * {
        line-height: 50px;
        height: 50px;
    }
    & > div:nth-child(1), div:nth-child(4) {
        font-weight: bolder;
    }
    & div:nth-child(1) {
        cursor: pointer;
        width: 75%;
    }
    & div:nth-child(2) {
        width: 10%;
    }
    & div:nth-child(3) {
        width: 10%;
    }
    & div:nth-child(4) {
        cursor: pointer;
        width: 5%;
        font-size: 30px;
    }
    `

    const Line = styled.hr`
        margin: 15px 0 15px 0;
    `;
    export default ListItem;