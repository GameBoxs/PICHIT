import styled from "styled-components";

function RoomListItem(props) {
    return(
        <RoomItem>
            <div className="rommtitle">
                <h4>{props.title}</h4>
                <p>{props.Participant}/{props.personnel}</p>
            </div>
            <p>{props.date}</p>
        </RoomItem>
    )
}

export default RoomListItem;


const RoomItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid black;
  border-radius: 15px;
  width: 32%;
  height: 100px;
  padding: 2%;
  margin-bottom:2%;
  div{
    display: flex;
    justify-content: space-between;
    /* margin: 0px 5px; */
  }
  p{
    display: flex;
    flex-direction: row-reverse
  }
`;
