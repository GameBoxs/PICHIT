/* ETC Import */
import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

const OvVideo = ({streamManager}) => {
    const videoRef = useRef()

    /* Rendering 이후 1회만 실행 */
    useEffect(()=>{
        /* streamManager 값이 있고 videoRef가 undefined/""/0 이 아닐 때 */
        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
        }
    },[])

    /* streamManager 변경 감지 */
    useEffect(()=>{
        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
        }
    }, [streamManager])

    return <V autoPlay={true} ref={videoRef}/>;
}

export default OvVideo

/* Styled-Component */
const V = styled.video`
    height: 100%;
`
