import styled from "styled-components";
import Title from "../common/Title"
import SubTitle from "../common/SubTitle"

function EmptyRoomList(props) {
    const emptyTitle = props.main
    const emptySubTitle = props.sub
    return(
        <EmptyBox> 
            <Title title={emptyTitle}/>
            <SubTitle title={emptySubTitle}/>
        </EmptyBox>
    )
}

export default EmptyRoomList;

const EmptyBox = styled.div`
    /* border: 1px solid red; */
    padding-top: 11rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'SBAggroL';
    gap: 0.5rem;
    
`