import styled from "styled-components";
import Title from "../../../common/Title";
import SubTitle from "../../../common/SubTitle";

const ListItem = (props) => {
  console.log('ListItem');
  console.log(props);
  const tempDate = props.item.startDate !== undefined ? new Date((props.item.startDate).toString()) : null;
  const date = tempDate !== null ? tempDate.getFullYear().toString().slice(2,4) + '.' +  (tempDate.getMonth()+1).toString() + '.' + tempDate.getDate().toString() : null;
  const changeID = () => {
    if(props.item.startDate !== undefined){
      props.setSelectedID(props.myID);
    }
  }
    return(
      <>
        <ItemWrap onClick={changeID} cursor={props.cursor}>
          {
            props.item && props.item.title ?
            <>
              <Title title={props.item.title} />
            </>
            : 
            <Title title="" />
          }
          {
            props.item && props.item.title ?
            <SubTitle title={date}></SubTitle>
            : <SubTitle title=""></SubTitle>
          }
          {props.item.title !=="" && props.item.title !== null && props.item.title !== undefined ? <SubTitle title=">"></SubTitle> : null }
        </ItemWrap>
        <Line></Line>
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
        /* cursor: pointer; */
        cursor: ${props => props.cursor};
        width: 85%;
      }
      & div:nth-child(2) {
        width: 10%;
      }
      & div:nth-child(3) {
        /* cursor: pointer; */
        cursor: ${props => props.cursor};
        width: 5%;
        font-size: 30px;
    }
    `

    const Line = styled.hr`
        margin: 15px 0 15px 0;
    `;
    export default ListItem;