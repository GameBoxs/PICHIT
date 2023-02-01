import styled from "styled-components";
import Title from "../common/Title"
import SubTitle from "../common/SubTitle"

function EmptyRoomList() {
    const emptyTitle = '방이 없습니다.'
    const emptySubTitle = '방생성을 통해 방을 생성해주세요'
    return(
        <div> 
            <Title title={emptyTitle}/>
            <SubTitle title={emptySubTitle}/>
        </div>
    )
}

export default EmptyRoomList;