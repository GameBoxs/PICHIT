import styled from "styled-components";
import RoomListItem from './RoomListItem'

// {
//     "id": 80,
//     "title": "멋진 면접",
//     "currentPersonCount": 1,
//     "maxPersonCount": 4,
//     "secretRoom": true,
//     "finished": false,
//     "startDate": "2023-01-24T08:40:10.495"
// }

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
    justify-content: flex-start;
    gap: 1rem;
    list-style:none;
    width: 100%;
`
