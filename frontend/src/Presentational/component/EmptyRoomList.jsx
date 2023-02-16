import styled from "styled-components";
import Title from "../common/Title"
import SubTitle from "../common/SubTitle"

//방이 없을 때 안내문구 띄우는 컴포넌트
function EmptyRoomList(props) {
    const emptyTitle = props.main
    const emptySubTitle = props.sub

    return(
        <EmptyBox className="guidance"> 
            <Title title={emptyTitle}/>
            <SubTitle title={emptySubTitle}/>
        </EmptyBox>
    )
}

export default EmptyRoomList;

const EmptyBox = styled.div`
    padding-top: 11rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'SBAggroL';
    gap: 0.5rem;
    
`