import React from "react";
import styled from "styled-components";
import Button from "../../common/Button";
import { useLocation, useNavigate } from "react-router-dom";

import Screen from "../../layout/Interview/Screen";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { leaveSession } from "../../../action/modules/chatModule";
import { selectInterviwee } from "../../../action/modules/chatModule";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const MySwal = withReactContent(Swal);

const SelectIntervieweePage = ({
  session,
  setSession,
  OV,
  setOV,
  info,
  setInfo,
}) => {
  const {userinfo, roomId, isHost} = useLocation().state;
  let navigate = useNavigate();
  const myToken = useSelector((state) => state.token);
  const [roomNum, setRoomNum] = useState(0);

  //방장이 면접자를 고를 때/고르지 않을 때 뜰 문구
  const [isSelect, setIsSelect] = useState(true);
  const sentance = isSelect ? "방장이 면접자를 선택하고 있습니다" : "대기 중입니다";

  useEffect(() => {
    let roomID = JSON.parse(info.publisher.stream.connection.data).clientRoomId;
    setRoomNum(roomID)
  }, [info])

  useEffect(()=> {
    session.on("signal:startSelectInterviewer", (e) => {
      setIsSelect(true);
    });
    session.on("signal:stopSelectInterviewer", (e) => {
      setIsSelect(false);
    });
  },[session])

  const handler = () => {
    session.signal({
      data:'',
      to:[],
      type: 'startSelectInterviewer'
    })
    let myID = JSON.parse(info.publisher.stream.connection.data).clientId;
    let myNickName = JSON.parse(info.publisher.stream.connection.data).clientData;
    let MemberList = new Object();
    
    if(JSON.parse(info.publisher.stream.connection.data).isFinishedInterViewee === false){
      MemberList[myID] = myNickName;
    }
    
    for (let i = 0; i < info.subscribers.length; i++) {
      let targetID = JSON.parse(
        info.subscribers[i].stream.connection.data
      ).clientId;
      let targetNickName = JSON.parse(
        info.subscribers[i].stream.connection.data
      ).clientData;
      if(JSON.parse(info.subscribers[i].stream.connection.data).isFinishedInterViewee === false){
        MemberList[targetID] = targetNickName;
      }
    }

    MySwal.fire({
      title: "면접자를 선택해주세요",
      icon: "question",
      input: "select",
      inputOptions: MemberList,
      inputPlaceholder: "면접자 선택",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          if(myID.toString() === result.value.toString()){
            let convert = JSON.parse(info.publisher.stream.connection.data);
            convert.isFinishedInterViewee = true;
            info.publisher.stream.connection.data = JSON.stringify(convert);
          } else {
            for (let i = 0; i < info.subscribers.length; i++) {
              if(JSON.parse(info.subscribers[i].stream.connection.data).clientId.toString() === result.value.toString()){
                let convert = JSON.parse(info.subscribers[i].stream.connection.data);
                convert.isFinishedInterViewee = true;
                info.subscribers[i].stream.connection.data = JSON.stringify(convert);
                break;
              }
            }
          }
          selectInterviwee(result.value.toString(), roomNum, myToken);
          session.signal({
            data: result.value.toString(),
            to: [],
            type: "stage",
          });
        } else {
          // selectInterviwee(3212, session.sessionId);
          selectInterviwee("미지정", session.sessionId);
        }
      }
      else {
        session.signal({
          data:'',
          to:[],
          type: 'stopSelectInterviewer'
        })
      }
    })
  }

  return (
    <Container>
      <Title>대기실</Title>
      <ConditionSentance>{sentance}</ConditionSentance>
      <Screen number={info.subscribers.length} info={info} />
      <BottomPanel>
        {isHost ? (
          <Button handler={handler} text="시작" isImportant={true} />
        ) : null}
        <Button
          text="종료"
          handler={() => {
            leaveSession(session, setOV);
            navigate(`/room/${roomNum}`,{state:{},replace:true});
          }}
          isImportant={false}
        />
      </BottomPanel>
    </Container>
  );
};

export default SelectIntervieweePage;

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
