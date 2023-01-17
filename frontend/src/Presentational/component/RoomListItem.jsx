import styled from "styled-components";

function RoomListItem(props) {
    return(
        <RoomItem>
            <div>
                <h4>방제목:{props.title}</h4>
                <p>{props.Participant}/{props.personnel}</p>
            </div>
            <p>{props.date}</p>
        </RoomItem>
    )
}

export default RoomListItem;


const RoomItem = styled.li`
  border: 2px solid gray;
  border-radius: 15px;
`;
