// ETC Import Start
import React, {useState, useEffect, useCallback} from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// ETC Import End

// component Import Start
import Screen from "../../layout/Interview/Screen";
// component Import End

// Module Import Start
import { leaveSession, selectInterviwee } from "../../../action/modules/chatModule";
import useAxios from "../../../action/hooks/useAxios";
// Module Import End

// Global Variable Start
const MySwal = withReactContent(Swal);
// Global Variable End

const SelectIntervieweePage = (props) => {
    const navigate = useNavigate(); // Page 이동을 위한 navigate
    const {session, setOV, info, myToken, roomStateData, setRoomStateExecute} = props;
    const roomInfo = JSON.parse(sessionStorage.getItem('roomInfo'));

    //방장이 면접자를 고를 때/고르지 않을 때 뜰 문구
    const [isSelect, setIsSelect] = useState(false);
    const sentance = isSelect ? "방장이 면접자를 선택하고 있습니다" : "대기 중입니다";

    const [allCloseExecute, setAllCloseExecute] = useState(false);
    const [allCloseData, allCloseIsLoading, allCloseError] = useAxios(
      `conference/sessions/close/${roomInfo.roomId}`,
      'DELETE',
      myToken,
      {},
      allCloseExecute
    )

    const intervieweeSelectHandler = () => {
        session.signal({
            data:'',
            to:[],
            type: 'startSelectInterviewer'
        })
        let myID = roomInfo.userInfo.id;
        let myNickName = roomInfo.userInfo.name;
        let MemberList = new Object();
        let mydata = roomStateData.data.participants.filter(item => item.id === myID);
        
        console.log('룸 정보는? ', roomInfo, myID, myNickName);
        console.log('내 데이터는? ', mydata);

        if(mydata[0].finished === false){
            MemberList[myID] = myNickName;
        }
        console.log('멤버 리스트야', MemberList);

        for (let i = 0; i < info.subscribers.length; i++) {
            let targetID = JSON.parse(
              info.subscribers[i].stream.connection.data
            ).clientId;
            let targetNickName = JSON.parse(
              info.subscribers[i].stream.connection.data
            ).clientData;
            let targetData = roomStateData.data.participants.filter(item => item.id === targetID )
            if(targetData[0].finished === false){
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
                if(result.value) {
                    selectInterviwee(result.value, roomInfo.roomId, myToken);
                }
            } else {
                session.signal({
                    data:'',
                    to:[],
                    type: 'stopSelectInterviewer'
                })
            }
        })
    }

    const outSession = useCallback(() => {
        leaveSession(session, setOV);
        navigate('/interview',{state:{},replace:true});
        window.location.reload();
    },[props]);

    useEffect(() => {
        window.addEventListener("beforeunload", outSession);
        return () => {
            window.removeEventListener("beforeunload", outSession);
        };
    }, [props]);
    // useEffect(() => {
    //     window.addEventListener("beforeunload", (e) => {
    //         leaveSession(session, setOV);
    //         navigate('/interview',{state:{},replace:true});
    //         window.location.reload();
    //     });
    //     return () => {
    //         window.removeEventListener("beforeunload", (e) => {
    //             leaveSession(session, setOV);
    //             navigate('/interview',{state:{},replace:true});
    //             window.location.reload();
    //         });
    //     };
    // }, []);

    useEffect(() => {
      if(allCloseExecute) setAllCloseExecute(false);
    },[allCloseExecute])

    useEffect(() => {
        setRoomStateExecute(true);
    },[])

    useEffect(()=> {
        if(session){
            session.on("signal:startSelectInterviewer", (e) => {
              setIsSelect(true);
            });
            session.on("signal:stopSelectInterviewer", (e) => {
              setIsSelect(false);
            });
        }
    },[session])

    return (
        <Container>
          <Title>대기실</Title>
          <ConditionSentance>{sentance}</ConditionSentance>
          <Screen number={info.subscribers.length} info={info} />
          <BottomPanel>
            {roomInfo.isHost ? (
              <Button handler={intervieweeSelectHandler} text="시작" isImportant={true} />
            ) : null}
            {
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

