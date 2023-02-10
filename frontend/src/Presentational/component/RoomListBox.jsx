import RoomList from "./RoomList"
import EmptyRoomList from "./EmptyRoomList"

function RoomListBox(props) {
    //데이터가 없는경우
    if(props.roomsData.content.length === 0){
        // total에서
        if(props.roomPosition ===false){
            // 검색결과 없는경우
            if(props.search !== ""){
                return(<EmptyRoomList
                    main={"찾으시는 방이 없습니다."}
                    sub={"새로운 방에 참가하거나 방을 생성해주세요."}
                />)
            }
            // 생성된 방이 없는경우
            else{
                return(<EmptyRoomList
                    main={"현재 방이 없습니다."}
                    sub={"방생성을 통해 방을 생성해주세요"}
                />)
            }
        }
        //my에서 finished
        else if(props.roomPosition){
            //완료방이 없는경우
            if(props.finished === '1'){
                return(<EmptyRoomList
                    main={"참여 완료된 방이 없습니다."}
                    sub={"참가한 방의 미팅이 끝난 경우 이곳에 표시됩니다."}
                />)
            }
            //시작예정인 방이 없는경우
            else if(props.finished === '0'){
                return(<EmptyRoomList
                    main={"시작 예정인 방이 없습니다."}
                    sub={"새로운 방에 참가하거나 방을 생성해주세요."}
                />)
            }
            //참여한 방이 그냥 없는경우(MY-모든방)
            else{
            return(<EmptyRoomList
                main={"참여중인 방이 없습니다."}
                sub={"새로운 방에 참가하거나 방을 생성해주세요."}
            />)
            }
        }
    }
    //데이터가 있는경우
    else {
        return(
        <RoomList rooms={props.roomsData.content} />
    )}
}

export default RoomListBox;