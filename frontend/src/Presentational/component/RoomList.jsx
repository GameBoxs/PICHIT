import styled from "styled-components";
import RoomListItem from './RoomListItem'

  
function RoomList(props) {
    return(
        <ul>
            {props.rooms.map((room)=>
                <RoomListItem
                    key={room.id} 
                    title={room.title} 
                    Participant={room.Participant} 
                    personnel={room.personnel} 
                    date={room.date} 
                />
            )}
        </ul>
    )
}

export default RoomList; 
