import styled from "styled-components";
import RoomListItem from './RoomListItem'

function RoomList(props) {
    return(
        <RoomListul>
            {props.rooms.map((room,index)=>
                <RoomListItem
                    key={index} 
                    data = {room}
                    index={index}
                />
            )}
        </RoomListul>
    )
}

export default RoomList; 

const RoomListul = styled.ul`
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    gap: 1rem;
    list-style:none;
    width: 100%;
`
