// Page Import Start
import PrepareInterview from "./PrepareInterview";
// Page Import End

// ETC Import Start
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
// ETC Import End

// OpenVidu Import Start
import { OpenVidu } from "openvidu-browser";
import {getToken, leaveSession,} from '../../../action/modules/chatModule';
// OpenVidu Import End

const NewInterviewPage = () => {
    const navigate = useNavigate(); // Page 이동을 위한 navigate
    const roomInfo = useSelector((state) => state.room);
    const myToken = useSelector((state) => state.token);
    const [info, setInfo] = useState({
        interviewee: "미지정",
        mySessionId: roomInfo.roomId,
        myUserName: roomInfo.userInfo.name,
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
      });
    const [session, setSession] = useState(null);
    const [OV, setOV] = useState(new OpenVidu());

    // 초기 세션 참가시 실행 함수
    const joinSession = () => {
        setSession(OV.initSession());
    }
    // 참여자 목록 리스트 수정 함수
    const deleteSubscriber = (streamManager) => {
        let subscribers = info.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            setInfo((prev) => {
                return { ...prev, subscribers: subscribers };
            });
        }
    };

    // 컴포넌트 마운트 될 때 실행
    useEffect(() => {
        joinSession();

        window.addEventListener("beforeunload", () => {
            leaveSession(session, setOV);
        });
        return () => {
            window.removeEventListener("beforeunload", () => {
                leaveSession(session, setOV);
            });
        };
    }, []);

    // state OV가 변경 될 때 마다 실행
    useEffect(() => {
        setInfo((prev) => {
        return {
            ...prev,
            session: undefined,
            subscribers: [],
            mySessionId: roomInfo.roomId,
            myUserName: roomInfo.userInfo.name,
            mainStreamManager: undefined,
            publisher: undefined,
        };
        });
    }, [OV]);

    useEffect(() => {
        let mySession = session;

        if(mySession !== null){
            // when an some one join signal is received.
            mySession.on("streamCreated", (e) => {
                let subscriber = mySession.subscribe(e.stream, undefined);
                let subscribers = info.subscribers;
                subscribers.push(subscriber);

                setInfo((prev) => {
                    return { ...prev, subscribers: subscribers };
                });
            });

            // when an some one disconnected signal is received.
            mySession.on("streamDestroyed", (e) => {
                deleteSubscriber(e.stream.streamManager);
            })

            // when an exception signal is received.
            mySession.on("exception", (exception) => {
                console.warn(exception);
            });

            // when an Interview Start signal is received.
            mySession.on("broadcast-interview-start", (signal) => {
                let intervieweeID = signal.data;
                if(intervieweeID) {
                    if(intervieweeID === roomInfo.userInfo.id) {
                        navigate("/interview/interviewer", {
                            state: {}, replace:true
                        });
                    }
                    else {
                        navigate("/interview/interviewee", {
                            state: {}, replace:true
                        });
                    }
                }
            })
            
            // when an Interview End signal is received.
            mySession.on("broadcast-interview-end", () => {
                navigate("/interview/selectinterviewee", {
                    state: {}, replace:true
                });
            })

            // init publish
            getToken(roomInfo.roomId, myToken).then((token) => {
                mySession.connect(token.data, { clientData: info.myUserName, clientId: roomInfo.userInfo.id, clientRoomJoinId: roomInfo.userInfo.interviewJoinId, clientRoomId: roomInfo.roomId })
                .then(async () => {
                    let publisher = null;
                    try {
                        publisher = await OV.initPublisherAsync(undefined, {
                            audioSource: undefined,
                            videoSource: undefined,
                            publishAudio: true,
                            publishVideo: true,
                            resolution: "640x480",
                            frameRate: 30,
                            insertMode: "APPEND",
                            mirror: false,
                        })

                        mySession.publish(publisher);

                        let devices = await OV.getDevices();
                        let videoDevices = devices.filter((device) =>
                            device.kind === "videoinput"
                        )

                        let currentVideoDeviceId = publisher.stream
                            .getMediaStream()
                            .getVideoTracks()[0]
                            .getSettings().deviceId;
                        
                        let currentVideoDevice = videoDevices.find((device) =>
                            device.deviceId === currentVideoDeviceId
                        )

                        setInfo((prev) => {
                            return {
                                ...prev,
                                currentVideoDevice: currentVideoDevice,
                                mainStreamManager: publisher,
                                publisher: publisher,
                            };
                        });
                    } catch (error) {
                        let devices = await OV.getDevices();
                        if(devices.length !== 0) {
                            if(error.name === 'INPUT_VIDEO_DEVICE_NOT_FOUND') {
                                Swal.fire({
                                    title: "카메라를 찾을 수 없음!",
                                    text:`카메라를 찾을 수 없습니다. 그래도 진행 하시겠습니까?`,
                                    icon: "warning",
                                    showCancelButton: true,
                                    showConfirmButton: true,
                                    confirmButtonText: "확인",
                                }).then(res => {
                                    if(res.isDenied){
                                        navigate("/",{state:{}, replace:true});
                                        window.location.reload();
                                    }
                                })
                                publisher = await OV.initPublisherAsync(undefined, {
                                    audioSource: undefined,
                                    videoSource: false,
                                    publishAudio: true,
                                    publishVideo: false,
                                    resolution: "640x480",
                                    frameRate: 30,
                                    insertMode: "APPEND",
                                    mirror: false,
                                });
                            }
                            else if(error.name === 'INPUT_AUDIO_DEVICE_NOT_FOUND') {
                                Swal.fire({
                                    title: "마이크를 찾을 수 없습니다!",
                                    text:`본 서비스는 마이크는 필수 입니다.\n마이크 장치 연결 후 재접속 해주세요`,
                                    icon: "warning",
                                    showCancelButton: false,
                                    showConfirmButton: true,
                                    confirmButtonText: "확인",
                                }).then(res => {
                                    if(res.isConfirmed) {
                                        navigate("/",{state:{}, replace:true});
                                        window.location.reload();
                                    }
                                })
                            }
                        }
                        mySession.publish(publisher);
                        setInfo((prev) => {
                            return {
                                ...prev,
                                publisher: publisher,
                            };
                        });
                    }
                    finally{
                        navigate("/interview/selectinterviewee", {
                            state: {}, replace:true
                        });
                    }
                }).catch((error) => {
                    if(error.message === 'NotAllowedError: Permission denied'){
                        Swal.fire({
                            title: "장치 권한을 허용해 주세요",
                            text:`상단의 주소창에서 카메라를 클릭하여 허용해 주시거나, \n브라우저 설정에서 허용으로 변경해 주세요 \n메인화면으로 돌아갑니다.`,
                            icon: "error",
                            showCancelButton: false,
                            showConfirmButton: true,
                            confirmButtonText: "확인",
                        }).then((result) => {
                            if (result.isConfirmed){
                                navigate('/',{state:{},replace:true});
                                window.location.reload();
                            }
                        });
                    }
                })
            })
        }
    }, [session]);

    return (
        <Routes>
            <Route path="/" element={<PrepareInterview session={session}setOV={setOV} info={info}/>} />
        </Routes>
    )
}

export default NewInterviewPage;