/* ETC Import */
import React, {useState, useEffect, useCallback} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/* component Import */
import Screen from "../../layout/Interview/Screen";
import Button from "../../common/Button";

/* Module Import */
import { leaveSession, selectInterviwee } from "../../../action/modules/chatModule";
import useAxios from "../../../action/hooks/useAxios";

/* Global Variable */
const MySwal = withReactContent(Swal);

const SelectIntervieweePage = (props) => {
  /* Page 이동을 위한 navigate */
  const navigate = useNavigate();
  /* 전달 받은 데이터 destructuring */
  const {session, setOV, info, myToken, roomStateData, setRoomStateExecute} = props;
  /* Session Storage에 저장된 roomInfo key에 해당하는 value를 roomInfo에 저장 */
  const roomInfo = JSON.parse(sessionStorage.getItem('roomInfo'));
  /* 방장이 면접자 선택 중 인지 확인할 Flag State */
  const [isSelect, setIsSelect] = useState(false);
  /* 방장이 면접자를 선택하고 있을 때 / 선택하고 있지 않을 때 보여 줄 문구 */
  const sentance = isSelect ? "방장이 면접자를 선택하고 있습니다" : "대기 중입니다";

  /* 방장이 모든 면접 프로세스를 종료 할때 요청할 Axios Execute Flag State */
  const [allCloseExecute, setAllCloseExecute] = useState(false);
  /* 방장이 모든 면접 프로세스를 종료 할때 요청할 Axios */
  const [allCloseData, allCloseIsLoading, allCloseError] = useAxios(
    `conference/sessions/close/${roomInfo.roomId}`,
    'DELETE',
    myToken,
    {},
    allCloseExecute
  )

  /* 면접자 선택 함수 */
  const intervieweeSelectHandler = () => {
    /* 함수 실행 시 OpenVidu에 custom signal 전송 */
    session.signal({
        data:'',
        to:[],
        type: 'startSelectInterviewer'
    })
    /* 
      myID - 나의 ID
      myNickName - 나의 이름
      MemberList - 면접 대상자를 넣을 Object
      myData - 현재 방 상태에서 참가자 목록에 대한 데이터 중 나의 ID와 일치하는 데이터
    */
    let myID = roomInfo.userInfo.id;
    let myNickName = roomInfo.userInfo.name;
    let MemberList = new Object();
    let mydata = roomStateData.data.participants.filter(item => item.id === myID);

    /* 나의 데이터 중에서 나는 면접자 역할을 하지 않은 상태 라면 MemberList에 추가 */
    if(mydata[0].finished === false){
      MemberList[myID] = myNickName;
    }

    /* 나를 제외한 참여자들 수 만큼 반복 */
    for (let i = 0; i < info.subscribers.length; i++) {
      /* 
        targetID - index에 해당하는 참가자 ID
        targetNickName - index에 해당하는 참가자 이름
        targetData - 방 상태에서 참가자 목록 중 index에 해당하는 참가자ID와 일치하는 데이터
      */
      let targetID = JSON.parse(
        info.subscribers[i].stream.connection.data
      ).clientId;
      let targetNickName = JSON.parse(
        info.subscribers[i].stream.connection.data
      ).clientData;
      let targetData = roomStateData.data.participants.filter(item => item.id === targetID )
      
      /* index에 해당하는 참가자가 면접자 역할을 하지 않은 경우 MemberList에 추가 */
      if(targetData[0].finished === false){
        MemberList[targetID] = targetNickName;
      }
    }

    /* MemberList 추가가 끝난 이후 면접자 선택 모달 */
    MySwal.fire({
        title: "면접자를 선택해주세요",
        icon: "question",
        input: "select", // input type은 select
        inputOptions: MemberList, // input option은 위에서 설정한 MemberList
        inputPlaceholder: "면접자 선택",
        showCancelButton: true,
    }).then((result) => {
      /* 확인 버튼을 누른 경우 */
      if (result.isConfirmed) {
        /* 값이 있을 경우 */
        if(result.value) {
          /* 해당 값으로 면접자를 지정 */
          selectInterviwee(result.value, roomInfo.roomId, myToken);
        }
      }
      /* 취소 버튼 누른 경우 */ 
      else {
        /* OpenVidu에 custom signal 전송(면접자 선택x) */
        session.signal({
            data:'',
            to:[],
            type: 'stopSelectInterviewer'
        })
      }
    })
  }

  /* 세션 종료 함수로 usecallback을 사용하여 1회만 함수가 생성되도록 함, props를 의존성으로 넣음 */
  const outSession = useCallback(() => {
    /* OpenVidu 세션 종료 */
    leaveSession(session, setOV);
    navigate('/interview',{state:{},replace:true});
    window.location.reload();
  },[props]);

  /* props가 변경될 때 실행 */
  useEffect(() => {
    /* 브라우저가 종료 되기 전 감지하는 윈도우 이벤트 리스너 추가, 실행할 함수는 outSession */
    window.addEventListener("beforeunload", outSession);
    /* unMount 될 때 실행 */
    return () => {
      /* 다른 페이지에서 위에 추가한 윈도우 이벤트가 남아 있으면 안되므로 제거 */
      window.removeEventListener("beforeunload", outSession);
    };
  }, [props]);

  /* allCloseExecute 감지 */
  useEffect(() => {
    if(allCloseExecute) setAllCloseExecute(false);
  },[allCloseExecute])

  /* Rendering 이후 1회만 실행 */
  useEffect(() => {
    /* InterviewPage.jsx에서 방 상태 Axios Execute Flag를 true 로 변경 */
    /* 대기실에 입장 할 때 마다 모든사람들이 똑같은 데이터로 동기화 시키기 위해 */
    setRoomStateExecute(true);
  },[])

  /* session 변경 감지 */
  useEffect(()=> {
    /* session이 null이 아닐때 */
    if(session){
      /* 면접자 선택중 이라는 신호를 받았을 때 */
      session.on("signal:startSelectInterviewer", (e) => {
        setIsSelect(true);
      });
      /* 면접자 선택 중지 신호를 받았을 때 */
      session.on("signal:stopSelectInterviewer", (e) => {
        setIsSelect(false);
      });
    }
  },[session])

  return (
    <Container>
      <Title>대기실</Title>
      {/* 면접자 선택중 여부에 따라 문구를 보여줌 */}
      <ConditionSentance>{sentance}</ConditionSentance>
      {/* 화상 화면 출력 영역 */}
      <Screen number={info.subscribers.length} info={info} />
      {/* 하단 영역 */}
      <BottomPanel>
        {/* 만약 방장일 때는 시작 버튼 보여주고 아니면 숨김 */}
        {roomInfo.isHost ? (
          <Button handler={intervieweeSelectHandler} text="시작" isImportant={true} />
        ) : null}
        {
          /* 만약 방장일 때는 스터디 종료 버튼을 보여주고 아니면 숨김 */
          roomInfo.isHost ?
          <Button
            text="스터디 종료"
            handler={() => {
              Swal.fire({
                title: "스터디 종료",
                text:`스터디를 종료 하시겠습니까?`,
                icon: "warning",
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: "확인",
                cancelButtonText : "취소"
            }).then(res => {
                if(res.isConfirmed){
                  setAllCloseExecute(true);
                }
              })
            }}
            isImportant={false}
          />
          : null
        }
      </BottomPanel>
    </Container>
  );
}

export default SelectIntervieweePage;

/* Styled-Component */
const BottomPanel = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

const ConditionSentance = styled.h3`
  font-size: 1em;
  margin-bottom: 1em;
  color: var(--greyDark);
`;

const Title = styled.h1`
  font-size: 2em;
  margin: 0 0 1rem 0;
  font-weight: 600;
  color: var(--primary);
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--greyLight-1);
`;

