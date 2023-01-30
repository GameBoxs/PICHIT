import React from "react";
import styled from "styled-components";
import OpenViduVideoComponent from "./OvVideo";

const UserVideoComponent = ({streamManager}) => {
    const getNicknameTag = () => {
        return JSON.parse(streamManager.stream.connection.data).clientData;
    }

    return (
    <div>
        {streamManager !== undefined ? (
        <StreamWrap className="streamcomponent">
            <OpenViduVideoComponent streamManager={streamManager} />
            {/* <div>
            <p>{getNicknameTag()}</p>
            </div> */}
        </StreamWrap>
        ) : null}
    </div>);
};

const StreamWrap = styled.div`
  overflow: hidden;
  width: 442px;
  height: 375px;
  border-radius: 5%;
`

export default UserVideoComponent;
