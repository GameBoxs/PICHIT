/* Page Import */
import PrepareInterview from "./PrepareInterview";
import SelectIntervieweePage from "./SelectIntervieweePage";
import InterviewerPage from "./InterviewerPage";
import IntervieweePage from "./IntervieweePage";

/* ETC Import */
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

/* OpenVidu Import */
import { OpenVidu } from "openvidu-browser";
import {getToken, leaveSession} from '../../../action/modules/chatModule';
import useAxios from "../../../action/hooks/useAxios";

const InterviewPage = () => {
    /* Page 이동을 위한 Navigate */
    const navigate = useNavigate();
    /* 새로고침 이후 방 상태를 불러 오기 위해 사용할 데이터가 담겨있는 Session Storage 로딩 */
    const roomInfo = JSON.parse(sessionStorage.getItem('roomInfo'));
    /* 로그인 시 발급 받아 Redux에 저장한 토큰값 불러오기*/
    const myToken = useSelector((state) => state.token);
    /* OpenVidu 정보들 저장하는 info Object */
    const [info, setInfo] = useState({
        interviewee: "미지정",
        mySessionId: roomInfo.roomId,
        myUserName: roomInfo.userInfo.name,
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
      });
    /* OpenVidu Session Object */
    const [session, setSession] = useState(null);
    /* OpenVidu Object */
    const [OV, setOV] = useState(new OpenVidu());
    /* interview Page 초기 접속시 방 상태 불러오는 custom hook Axios Execute Flag*/
    const [roomStateExecute, setRoomStateExecute] = useState(true);
    /* OpenVidu Publisher 초기 설정이 끝났는지 Check Flag */
    const [initFinish, setInitFinish] = useState(false);

    /* custom hook Axios를 사용하여 받은 방 상태 데이터를 저장하는 state*/
    const [roomStateData, setRoomStateData] = useState();
    /* custom Axios 데이터가 담기는 일반 변수 */
    const [roomStateDatas, roomStateIsLoading, roomStateError] = useAxios(
        `conference/interviewrooms/${roomInfo.roomId}/interviewstate`,
        "GET",
        myToken,
        {},
        roomStateExecute
    )

    /* 세션 참여시 실행 함수 */
    const joinSession = () => {
        setSession(OV.initSession()); // chatModule.js 에 있는 함수
        OV.enableProdMode();
    };
    
    /* 목록에서 나간 참여지 제거 함수 */
    const deleteSubscriber = (streamManager) => {
        /* subscribers - info에 저장된 참여자 목록 */
        let subscribers = info.subscribers;
        /* index - subscribers에서 streamManager를 0번째 인덱스 부터 찾음 */
        let index = subscribers.indexOf(streamManager, 0);

        /* index가 -1보다 크면 찾았다는 뜻. */
        if (index > -1) {
            /* 해당 참여자 제거 */
            subscribers.splice(index, 1);
            
            /* info 변경 */
            setInfo((prev) => {
                return { ...prev, subscribers: subscribers };
            });
        }
    };

    /* 접속시 분기점 체크 */
    const checkRoomstate = () => {
        /* Axios로 부른 데이터가 존재하고, 원하는 데이터가 존재 할 때 */
        if (roomStateData && roomStateData.data) {
            /* data - Axios로 로딩한 데이터 */
            let data = roomStateData.data;
            /* 
                currentInterviewee - 현재 방 상태에서 면접자에 대한 데이터가 존재하면 면접자 id를 저장, 아니면 null 저장
            */
            let currentInterviewee = data.currentInterviewee ? data.currentInterviewee.id : null;
            
            /* 면접자ID 가 존재 한다면 */
            if(currentInterviewee) {
                /* info에 면접자ID 저장 */
                setInfo((prev) => {
                    return { ...prev, interviewee: currentInterviewee };
                  });

                /* 나의 ID와 현재 진행중인 면접자 ID가 일치 한다면 면접자 페이지로 이동, 데이터 전달은 없음 */
                if(roomInfo.userInfo.id === currentInterviewee) {
                    navigate("/interview/interviewer", {
                        /* replace:true 옵션으로 인해 History에 Push가 아니라 replace 이므로 뒤로가기 시 현재 페이지로 되돌아 오지 않음 */
                        state: {}, replace:true
                    });
                }
                /* 나의 Id와 현재 진행중인 면접자 ID가 일치 하지 않는다면 면접관 페이지로 이동, 데이터 전달은 없음 */
                else {
                    navigate("/interview/interviewee", {
                        /* replace:true 옵션으로 인해 History에 Push가 아니라 replace 이므로 뒤로가기 시 현재 페이지로 되돌아 오지 않음 */
                        state: {}, replace:true
                    });
                }
            } 
            /* 면접자가 없다면 현재 면접진행중이 아니므로 대기실로 이동, 데이터 전달은 없음 */
            else {
                navigate("/interview/selectinterviewee", {
                    /* replace:true 옵션으로 인해 History에 Push가 아니라 replace 이므로 뒤로가기 시 현재 페이지로 되돌아 오지 않음 */
                    state: {}, replace:true
                });
            }
        }
        /* Axios로 부른 데이터가 존재 하지 않는다면 재접속 상태가 아닌 처음 상태이므로 대기실로 이동, 데이터 전달은 없음 */
        else{
            navigate("/interview/selectinterviewee", {
                /* replace:true 옵션으로 인해 History에 Push가 아니라 replace 이므로 뒤로가기 시 현재 페이지로 되돌아 오지 않음 */
                state: {}, replace:true
            });
        }
    }

    /* roomStateExecute 값이 변경 될 때 실행 */
    useEffect(() => {
        /* roomStateExecute가 true면 false로 변경 */
        if(roomStateExecute){
            setRoomStateExecute( () => false);
        }
    },[roomStateExecute])

    /* roomStateDatas, roomStateData, initFinish중 한개의 값이 변경 될 때 실행 */
    useEffect(() => {
        /* roomStateDatas가 null이 아니고, roomStateDatas에 data가 존재 한다면 */
        if(roomStateDatas && roomStateDatas.data) {
            /* roomStateData에 Axios로 받은 데이터 roomStateDatas 값으로 변경 */
            setRoomStateData(roomStateDatas);
        }
        /* roomStateData가 null이 아니고, roomStateData에 data가 존재하며, initFinish가 true일 때 */
        if(roomStateData && roomStateData.data && initFinish) {
            /* 분기점 검사하는 함수 실행 */
            checkRoomstate();
        };
    },[roomStateDatas,roomStateData,initFinish])

    /* OpenVidu Object가 변경될 때 실행 */
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

    /* Page가 Rendering 된 이후 1회만 실행 */
    useEffect(() => {
        joinSession();
    },[])

    useEffect(() => {
        let mySession = session;

        /* 저장된 세션이 null 이 아닐 때 */
        if(mySession !== null){
            /* 세션에 누군가 참여 했다는 신호를 받았을 때 */
            mySession.on("streamCreated", (e) => {
                /* subscriber에 참여자를 추가 시킨 뒤 info 변경 */
                let subscriber = mySession.subscribe(e.stream, undefined);
                let subscribers = info.subscribers;
                subscribers.push(subscriber);

                setInfo((prev) => {
                    return { ...prev, subscribers: subscribers };
                });
            });

            /* 세션에 누군가 나갔다는 신호를 받았을 때 */
            mySession.on("streamDestroyed", (e) => {
                /* 목록에서 나간 참여자 제거 함수 실행 */
                deleteSubscriber(e.stream.streamManager);
            })

            /* 예외가 발생했다는 신호를 받았을 때 */
            mySession.on("exception", (exception) => {
                /* 예외 출력 */
                console.warn(exception);
            });

            /* 면접이 시작됬다는 신호를 받았을 때 */
            mySession.on("broadcast-interview-start", (signal) => {
                /* intervieweeID - 받은 신호에서 저장된 데이터에 지정된 면접자 ID를 저장 */
                let intervieweeID = JSON.parse(signal.data).intervieweeId;
                /* info에 면접자 ID값 변경 */
                setInfo((prev) => {
                    return { ...prev, interviewee: intervieweeID };
                  });
                /* 면접자 ID를 저장한 변수에 값이 존재 할 때 */
                if(intervieweeID) {
                    /* 면접자 ID와 나의 ID가 같으면 면접자 페이지로 이동 */
                    if(intervieweeID === roomInfo.userInfo.id) {
                        navigate("/interview/interviewer", {
                            /* replace:true 옵션으로 인해 History에 Push가 아니라 replace 이므로 뒤로가기 시 현재 페이지로 되돌아 오지 않음 */
                            state: {}, replace:true
                        });
                    }
                    /* 면접자 ID와 나의 ID가 다르다면 면접관 페이지로 이동 */
                    else {
                        navigate("/interview/interviewee", {
                            /* replace:true 옵션으로 인해 History에 Push가 아니라 replace 이므로 뒤로가기 시 현재 페이지로 되돌아 오지 않음 */
                            state: {}, replace:true
                        });
                    }
                }
            })
            
            /* 면접이 끝났다는 신호를 받았을 때 */
            mySession.on("broadcast-interview-end", (e) => {
                /* 대기실로 이동 */
                navigate("/interview/selectinterviewee", {
                    /* replace:true 옵션으로 인해 History에 Push가 아니라 replace 이므로 뒤로가기 시 현재 페이지로 되돌아 오지 않음 */
                    state: {}, replace:true
                });
            })

            /* 세션이 닫혔다는 신호를 받았을 때 */
            mySession.on('session-closed', () => {
                /* 나의 세션을 종료하는 함수 실행 */
                leaveSession(session, setOV);
                /* 복기 페이지로 이동 */
                navigate('/review',{state:{},replace:true});
            })

            /* 방번호, 로그인시 부여받은 토큰으로 OpenVidu Token을 얻는 함수 */
            getToken(roomInfo.roomId, myToken).then((token) => {
                /* 만약 결과 값이 404가 아니라면 OpenVidu Token을 얻었음 */
                if(token !== '404'){
                    /* 습득한 OpenVidu Token으로 세션에 연결 시도, 2번째 인자 값은 저장할 데이터 값들 */
                    mySession.connect(token.data, { clientData: info.myUserName, clientId: roomInfo.userInfo.id, clientRoomJoinId: roomInfo.userInfo.interviewJoinId, clientRoomId: roomInfo.roomId })
                    .then(async () => {
                        /* publisher - OpenVidu에서 나를 지칭 */
                        let publisher = null;
                        /* 마이크 / 카메라 검사시 발생하는 오류에 대처 하기 위해 try catch 사용 */
                        try {
                            /* 아래 옵션으로 publisher 를 초기화 함 */
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
                            
                            /* 세션에 publisher를 publish 함 */
                            mySession.publish(publisher);
    
                            /* 장치 목록 얻기 */
                            let devices = await OV.getDevices();
                            /* filter를 사용하여 videoinput에 해당하는 장비 찾아 값을 넣음 */
                            let videoDevices = devices.filter((device) =>
                                device.kind === "videoinput"
                            )
    
                            /* 현재 카메라 ID값을 넣음 */
                            let currentVideoDeviceId = publisher.stream
                                .getMediaStream()
                                .getVideoTracks()[0]
                                .getSettings().deviceId;
                            
                            /* 현재 카메라 장치는 비디오 장치 들 중에서 현재 카메라 ID값과 일치하는 장치를 넣음 */
                            let currentVideoDevice = videoDevices.find((device) =>
                                device.deviceId === currentVideoDeviceId
                            )
                            
                            /* info 값 변경 */
                            setInfo((prev) => {
                                return {
                                    ...prev, // 변경되지 않는 이전 값들은 그대로 사용, 아래 변경되는 값만 변경
                                    currentVideoDevice: currentVideoDevice,
                                    mainStreamManager: publisher,
                                    publisher: publisher,
                                };
                            });
                        } catch (error) {
                            /* 장치 목록 얻기 */
                            let devices = await OV.getDevices();
                            /* 얻은 장치 목록의 길이가 0이 아니라면 */
                            if(devices.length !== 0) {
                                /* 발생하는 에러 이름이 INPUT_VIDEO_DEVICE_NOT_FOUND 일 때 */
                                if(error.name === 'INPUT_VIDEO_DEVICE_NOT_FOUND') {
                                    /* 카메라를 찾을 수 없는 에러 내용이므로 모달을 띄움 */
                                    Swal.fire({
                                        title: "카메라를 찾을 수 없음!",
                                        text:`카메라를 찾을 수 없습니다. 그래도 진행 하시겠습니까?`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        showConfirmButton: true,
                                        confirmButtonText: "확인",
                                    }).then(res => {
                                        /* 모달에서 취소를 누를 경우 페이지 메인화면으로 이동 */
                                        if(res.isDenied){
                                            navigate("/",{state:{}, replace:true});
                                            window.location.reload();
                                        }
                                    })
                                    /* 취소가 아니라 확인을 누른 경우 카메라 기능은 제거하고 음성만 가능한 모드로 publisher 설정 */
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
                                /* 발생하는 에러 이름이 INPUT_AUDIO_DEVICE_NOT_FOUND 일 때 */
                                else if(error.name === 'INPUT_AUDIO_DEVICE_NOT_FOUND') {
                                    /* 마이크를 찾을 수 없다는 에러 내용이므로 모달을 띄움 */
                                    Swal.fire({
                                        title: "마이크를 찾을 수 없습니다!",
                                        text:`본 서비스는 마이크는 필수 입니다.\n마이크 장치 연결 후 재접속 해주세요`,
                                        icon: "warning",
                                        showCancelButton: false, // 취소 버튼 비활성화
                                        showConfirmButton: true,
                                        confirmButtonText: "확인",
                                    }).then(res => {
                                        /* 본 서비스는 마이크 없이는 할 수 없으므로 메인 페이지로 이동 시킴 */
                                        if(res.isConfirmed) {
                                            navigate("/",{state:{}, replace:true});
                                            window.location.reload();
                                        }
                                    })
                                }
                            }
                            /* 오류로 인해 메인페이지로 이동 되지 않고 단순히 카메라만 안되고 확인을 했을 때 아래 실행 */
                            mySession.publish(publisher);
                            setInfo((prev) => {
                                return {
                                    ...prev,
                                    publisher: publisher,
                                };
                            });
                        }
                        /* try catch 끝난후 무조건 실행 */
                        finally{
                            /* publisher 설정이 끝났으므로 initFinish를 true로 변경함 */
                            setInitFinish(true);
                        }
                    })
                    /* 세션 연결 시도에서 에러가 발생 했을 때 */
                    .catch((error) => {
                        /* 초기 입장 시 장치 권한 요청에 거부를 했을 때 */
                        if(error.message === 'NotAllowedError: Permission denied'){
                            Swal.fire({
                                title: "장치 권한을 허용해 주세요",
                                text:`상단의 주소창에서 카메라를 클릭하여 허용해 주시거나, \n브라우저 설정에서 허용으로 변경해 주세요 \n메인화면으로 돌아갑니다.`,
                                icon: "error",
                                showCancelButton: false,
                                showConfirmButton: true,
                                confirmButtonText: "확인",
                            }).then((result) => {
                                /* 장치 권한을 차단하면 본 서비스에서 필수인 마이크가 거부되고 카메라도 찾을 수 없으므로 메인페이지로 이동 */
                                if (result.isConfirmed){
                                    navigate('/',{state:{},replace:true});
                                    window.location.reload();
                                }
                            });
                        }
                    })
                }
                /* OpenVidu Token을 받지 않고 404를 결과값을 받게 됬을 때 */ 
                else{
                    Swal.fire({
                        title: "문제가 발생!",
                        text:`방 상세보기에서 다시 접속해 주세요!`,
                        icon: "warning",
                        showCancelButton: false,
                        showConfirmButton: true,
                        confirmButtonText: "확인",
                    }).then(res => {
                        if(res.isConfirmed) {
                            navigate('/');
                        }
                    })
                }
            })
        }
    }, [session]);

    /* 라우팅 */
    return (
        <Routes>
            <Route path="/" element={<PrepareInterview session={session} setOV={setOV} info={info} myToken={myToken} roomStateData={roomStateData} setRoomStateExecute={setRoomStateExecute}/>} />
            <Route path="/selectinterviewee" element={<SelectIntervieweePage session={session} setOV={setOV} info={info} myToken={myToken} roomStateData={roomStateData} setRoomStateExecute={setRoomStateExecute}/>} />
            <Route path="/interviewer" element={<InterviewerPage session={session} setOV={setOV} info={info} myToken={myToken} roomStateData={roomStateData} />} />
            <Route path="/interviewee" element={<IntervieweePage session={session} setOV={setOV} info={info} myToken={myToken} roomStateData={roomStateData} />} />
        </Routes>
    )
}

export default InterviewPage;