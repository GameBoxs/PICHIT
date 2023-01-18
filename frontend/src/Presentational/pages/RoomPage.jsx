import styled from "styled-components";
import RoomHeader from "../layout/room/RoomHeader";
import RoomMain from "../layout/room/RoomMain";
import Footer from "../common/Footer";

function RoomPage(props) {

    return (
        <>
          <Page>
            <RoomHeader 
            title = {props.items[0].title}
            date = {props.items[0].date}
            />
            <RoomMain
            people = {props.items[0].people}
            content = {props.items[0].content}
             />
          </Page>
        </>
    )
}
export default RoomPage;

const Page = styled.div`
    margin-left: 10%;
    margin-right: 10%;
    height:auto;
    min-height: 100%;
    padding-bottom: 960px;

`