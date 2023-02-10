import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

const OvVideo = ({streamManager}) => {
    const videoRef = useRef()

    useEffect(()=>{
        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
        }
    },[])

    useEffect(()=>{
        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
        }
    }, [streamManager])

    return <V autoPlay={true} ref={videoRef}/>;
}

const V = styled.video`
    /* width: 100%; */
    height: 100%;
`

export default OvVideo