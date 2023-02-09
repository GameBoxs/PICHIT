import RoomList from "./RoomList"
import EmptyRoomList from "./EmptyRoomList"

function RoomListBox(props) {
    if (props.search !== "" && props.roomsData.content.length === 0 && props.roomPosition ===false){
        return(<EmptyRoomList
            main={"찾으시는 방이 없습니다."}
            sub={"방생성을 통해 방을 생성해주세요"}
          />)
    }
    else if (props.roomsData.content.length === 0 && props.roomPosition === false){
        return(<EmptyRoomList
            main={"현재 방이 없습니다."}
            sub={"방생성을 통해 방을 생성해주세요"}
        />)
    }
    else if (props.roomsData.content.length === 0 && props.roomPosition){
        return(<EmptyRoomList
            main={"참여중인 방이 없습니다."}
            sub={"방을 참가하거나 새로운 방을 생성해주세요"}
        />)
    }
    else {
        return(
        <RoomList rooms={props.roomsData.content} />
    )}
}

export default RoomListBox;