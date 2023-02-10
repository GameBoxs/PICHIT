import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import IntervieweePage from "./IntervieweePage"
import InterviewerPage from "./InterviewerPage";
import SelectIntervieweePage from "./SelectIntervieweePage";
import PrepareInterview from "./PrepareInterview";

// OpenVidu 관련 Import
import { useState,useEffect } from "react";
import { OpenVidu } from "openvidu-browser";
import {OpenViduLogger} from "openvidu-browser/lib/OpenViduInternal/Logger/OpenViduLogger"
import { useSelector } from "react-redux";
import {getToken, leaveSession,} from '../../../action/modules/chatModule';
// import {useNavigate} from 'react-router-dom';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const InterviewPage = () => {
  const navigate = useNavigate();
  /* 
    roomPage에서 받아온 값
    id : 해당 유저 아이디
    rommId : 방 아이디
  */
  const {userinfo, roomId, isHost} = useLocation().state;

  // const mySession = useSelector((state) => state.chatSession);
  const mySession = roomId;
  const myToken = useSelector((state) => state.token);

  const [info, setInfo] = useState({
    interviewee: "미지정",
    mySessionId: mySession,
    // myUserName: "Participant" + Math.floor(Math.random() * 100),
    myUserName: userinfo.name,
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
  });
  const [session, setSession] = useState(null);
  const [OV, setOV] = useState(new OpenVidu());

  // 컴포넌트 마운트 될 때 실행
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      leaveSession(session, setOV);
    });
  }, []);

  // 컴포넌트 마운트가 끊길 때 실행
  useEffect(() => {
    return () => {
      window.removeEventListener("beforeunload", () => {
        leaveSession(session, setOV);
      });
    };
  });

  // state OV가 변경 될 때 마다 실행
  useEffect(() => {
    setInfo((prev) => {
      return {
        ...prev,
        session: undefined,
        subscribers: [],
        mySessionId: mySession,
        // myUserName: "Participant" + Math.floor(Math.random() * 100),
        myUserName: userinfo.name,
        mainStreamManager: undefined,
        publisher: undefined,
      };
    });
  }, [OV]);

  // 세션 참여 함수
  const joinSession = () => {
    // OpenVidu 초기화
    setSession(OV.initSession());
    // OpenViduLogger.getInstance().enableProdMode(); // 건들지 말것
    // OpenViduLogger.getInstance().disableLogger(); // << 내가 작성한 console.log() 가 안나올때 해당 67번째 줄 주석 처리 하면 작동함.
  };

  // 컴포넌트 마운트 될 때 세션 참여 함수 실행
  useEffect(() => {
    joinSession();
  },[])

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

  useEffect(() => {
    let mySession = session;

    if (mySession !== null) {
      // 누군가 세션에 참가했다는 신호를 받았을 때
      mySession.on("streamCreated", (e) => {
        let subscriber = mySession.subscribe(e.stream, undefined);
        let subscribers = info.subscribers;
        subscribers.push(subscriber);

        setInfo((prev) => {
          return { ...prev, subscribers: subscribers };
        });
      });

      // 누군가 세션에서 나갔다는 신호를 받았을 때
      mySession.on("streamDestroyed", (e) => {
        console.log("연결 해제");
        console.log(e);
        console.log("커넥션 ID: " + e.stream.connection.connectionId);
        deleteSubscriber(e.stream.streamManager);
      });

      // 면접자가 정해졌다는 신호를 받았을 때
      mySession.on("broadcast-interviewee", (e) => {
        console.log("면접자 : " + JSON.parse(e.data).intervieweeId);
        setInfo((prev) => {
          return { ...prev, interviewee: JSON.parse(e.data).intervieweeId };
        });
      });

      // 예외 발생했다는 신호를 받았을 때
      mySession.on("exception", (exception) => {
        console.warn(exception);
      });

      mySession.on("broadcast-interview-end", (event) => {
        navigate("/interview/selectinterviewee", {
          state: {
            userinfo: userinfo,
            roomId: roomId,
            isHost: isHost,
          },replace:true
        });
      })

      // 시작 신호 받았을 때
      mySession.on("signal:stage", (event) => {
        console.log('---스터디시작 서버에 저장한 아이디 : ', event.data , ' / 내 아이디 :', userinfo.id, ' / 같은가?', event.data.toString() === userinfo.id.toString());
        // 면접자 미지정이 아니라면
        if(event.data !== '미지정'){
          // 내가 면접자 일때 면접자 페이지로 이동
          if(event.data.toString() === userinfo.id.toString()){
            navigate("/interview/interviewer", {
              state: {
                userinfo: userinfo,
                roomId: roomId,
                isHost: isHost,
              },replace:true
            });
          } 
          // 면접자가 아니라면 면접관 페이지로 이동
          else{
            navigate("/interview/interviewee", {
              state: {
                userinfo: userinfo,
                roomId: roomId,
                isHost: isHost,
              },replace:true
            });
          }
        }
      })

      // 내 세션에 토큰으로 인증
      getToken(roomId,myToken).then((token) => {
        mySession
          .connect(token.data, { clientData: info.myUserName, clientId: userinfo.id, clientRoomJoinId: userinfo.interviewJoinId, clientRoomId: roomId, isFinishedInterViewee: false })
          .then(async () => {
            let publisher=null;
            try{
              publisher = await OV.initPublisherAsync(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
                resolution: "640x480",
                frameRate: 30,
                insertMode: "APPEND",
                mirror: false,
              });

              mySession.publish(publisher);
  
              let devices = await OV.getDevices();
              let videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
              
              let currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
  
              let currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );
  
              setInfo((prev) => {
                return {
                  ...prev,
                  currentVideoDevice: currentVideoDevice,
                  mainStreamManager: publisher,
                  publisher: publisher,
                };
              });
             } catch(e){
              let devices = await OV.getDevices();
              console.log('디바이스 --- ', devices, devices.length);
              console.log(e.name);
              if(devices.length !== 0){
                if(e.name === 'INPUT_VIDEO_DEVICE_NOT_FOUND') {
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
                else if(e.name === 'INPUT_AUDIO_DEVICE_NOT_FOUND') {
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
                 state: {
                   userinfo: userinfo,
                   roomId: roomId,
                   isHost: isHost,
                 },replace:true
               });
             }

          })
          .catch((error) => {
            console.log(
              "세션 연결 에러 발생: 코드",
              error.code,
              ' 메세지 ',
              error.message
            );

            if(error.message === 'NotAllowedError: Permission denied'){
              Swal.fire({
                title: "장비 권한 없음!",
                text:`상단의 주소창에서 카메라를 클릭하여 허용해 주시거나, \n브라우저 설정에서 허용으로 변경해 주세요`,
                icon: "warning",
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
            
          });
      });
    }
  }, [session]);
  
  return (
    <Routes>
      <Route path="/" element={<PrepareInterview session={session} setSession={setSession} OV={OV} setOV={setOV} info={info} setInfo={setInfo}/>} />
      <Route path="/interviewee" element={<IntervieweePage session={session} setSession={setSession} OV={OV} setOV={setOV} info={info} setInfo={setInfo}/>} />
      <Route path="/interviewer" element={<InterviewerPage session={session} setSession={setSession} OV={OV} setOV={setOV} info={info} setInfo={setInfo}/>} />
      <Route path="/selectinterviewee" element={<SelectIntervieweePage session={session} setSession={setSession} OV={OV} setOV={setOV} info={info} setInfo={setInfo}/>} />
    </Routes>
  );
};

export default InterviewPage;
