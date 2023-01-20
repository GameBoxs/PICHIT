import styled from "styled-components";
import RoomListItem from './RoomListItem'

  
function RoomList(props) {
    return(
        <RoomListul>
            {props.rooms.map((room)=>
                <RoomListItem
                    key={room.id} 
                    title={room.title} 
                    Participant={room.Participant} 
                    personnel={room.personnel} 
                    date={room.date} 
                />
            )}
        </RoomListul>
    )
}

export default RoomList; 

const RoomListul = styled.ul`
    display: flex;
    flex-flow: wrap;
    justify-content:space-between;
    list-style:none;
    
`
