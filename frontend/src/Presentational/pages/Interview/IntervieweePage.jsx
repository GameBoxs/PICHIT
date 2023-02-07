import React, { useState } from "react";
import styled from "styled-components";

import SubTitle from "../../common/SubTitle";
import Rating from "../../layout/Interview/Rating";
import QuestionCompo from "../../component/QuestionCompo";

import { BsQuestionCircleFill } from "react-icons/bs";
import { GrHistory } from "react-icons/gr";
import { MdOutlineLogout } from "react-icons/md";
import ChatArea from "../../layout/Chat/ChatArea";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import UserVideoComponent from "../../component/Chat/OpenVidu/UserVideoComponent";
import { leaveSession } from "../../../action/modules/chatModule";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAxios from "../../../action/hooks/useAxios";
import { useSelector } from "react-redux";

const MySwal = withReactContent(Swal);

const dummy = [
  {
    id: 1,
    question: "잠온다",
    user: "이효진",
  },
  {
    id: 2,
    question: "너무 잠온다",
    user: "김민지",
  },
  {
    id: 3,
    question: "대박 잠온다",
    user: "이효진",
  },
  {
    id: 4,
    question: "상당히 잠온다",
    user: "임수민",
  },
  {
    id: 5,
    question: "과하게 잠온다",
    user: "이효진",
  },
  {
    id: 6,
    question: "생각보다 잠온다",
    user: "이희수",
  },
  {
    id: 7,
    question: "그럼 자면 되지",
    user: "김지훈",
  },
  {
    id: 8,
    question: "5만원 가치 하더라",
    user: "김지훈",
  },
  {
    id: 9,
    question:
      "테스트용 긴 질문테스트용 긴 질문테스트용 긴 질문테스트용 긴 질문테스트용 긴 질문테스트용 긴 질문테스트용 긴 질문테스트용 긴 질문테스트용 긴 질문테스트용 긴 질문테스트용 긴 질문테스트용 긴 질문",
    user: "이효진",
  },
  {
    id: 10,
    question: "끝났다",
    user: "김지현",
  },
];

const IntervieweePage = (props) => {
  const { session, setSession, OV, setOV, info, setInfo } = props;
  const token = useSelector((state) => state.token);

  const [reqBody, setReqBody] = useState({    //요청 보낼 때 쓰는 값들
    writerId: 0,
    intervieweeId: 0,
    interviewRoomId: 0,
  });
  const [intervieweeMem, setIntervieweeMem] = useState([]);   //면접관 명단들
  const [isQuestion, setIsQuestion] = useState(false);        //useAxios에서 excute로 쓰이는 애들
  const [questionData, setQuestionData] = useState([])        //질문 목록들

  //질문 받아오는 Axios
  const [getQuest] = useAxios(
    `questions?writerId=${reqBody.writerId}&intervieweeId=${reqBody.intervieweeId}&interviewRoomId=${reqBody.interviewRoomId}`,
    "GET",
    token,
    {},
    isQuestion
  );

  let navigate = useNavigate();

  let cnt = 3 - info.subscribers.length;

  function makeBlank() {
    let result = [];
    for (let i = 0; i < cnt; i++) {
      result.push(
        <CamCompo className="in" key={i}>
          aa
        </CamCompo>
      );
    }
    return result;
  }

  useEffect(() => {
    let myID = JSON.parse(info.publisher.stream.connection.data).clientId;
    let myNickName = JSON.parse(
      info.publisher.stream.connection.data
    ).clientData;
    let roomID = JSON.parse(info.publisher.stream.connection.data).clientRoomId;
    let MemberList = [];

    MemberList.push({ id: myID, name: myNickName });
    for (let i = 0; i < info.subscribers.length; i++) {
      let targetID = JSON.parse(
        info.subscribers[i].stream.connection.data
      ).clientId;

      let targetNickName = JSON.parse(
        info.subscribers[i].stream.connection.data
      ).clientData;

      MemberList.push({ id: targetID, name: targetNickName });
    }

    //면접관들 리스트
    const Members = MemberList.filter(
      (person) => person.id != info.interviewee
    );

    setIntervieweeMem([...Members]);

    /*
    --------------면접자 지정 제대로 되면 사용할 코드---------------
    */
    // setReqBody(() => {
    //   return {
    //     writerId: Members[0].id,
    //     intervieweeId: info.interviewee,
    //     interviewRoomId: roomID,
    //   };
    // });

    setReqBody(() => {  //테스트용 코드
      return {
        writerId: Members[0].id,
        intervieweeId: 3212,
        interviewRoomId: roomID,
      };
    });
  }, [props]);

  useEffect(() => {
    //질문자를 선택할 때마다 getQuest가 실행되도록 하기
    if (
      reqBody.writerId !== 0 &&
      reqBody.interviewRoomId !== 0 &&
      reqBody.intervieweeId !== 0
    ) {
      setIsQuestion(true);
    }
  }, [reqBody]);

  useEffect(() => {
    //질문 목록을 가져오는데 성공하면 QuestionData에 값을 저장
    if (getQuest !== null && getQuest.success) {
      setIsQuestion(false);
      setQuestionData(getQuest.data)
    }
  }, [getQuest]);

  const [chatOn, setChatOn] = useState(false);

  //채팅 활성화/비활성화
  const chatHandler = () => {
    setChatOn(!chatOn);
  };

  //질문 렌더링
  const Questions = questionData.map((el, id) => {
    return <QuestionCompo key={id} questionInfo={el} />;
  });

  //별점 값 받아오는 함수
  const RatingHandler = (e) => {
    console.log(e.target.value);
  };

  //질문 관리
  const QuestionHandler = (Questions) => {
    MySwal.fire({
      title: "질문을 시작하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "취소",
      showConfirmButton: true,
      confirmButtonText: "승인",
      html: (
        <div>
          <div></div>
        </div>
      ),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "질문이 제출 되었습니다.",
          text: "질문을 시작해주세요.",
          icon: "success",
        });
      }
    });
  };

  //질문자 선택 함수
  const setQuestioner = (elem) => {
    setReqBody((prev) => {
      return { ...prev, writerId: elem.id };
    });
  };

  //질문 컴포넌트 상단 면접관들 목록 보여주는 함수
  const interviewees = intervieweeMem.map((elem, idx) => {
    return (
      <React.Fragment key={idx}>
        <input
          type="radio"
          name={`radio`}
          value={elem.id}
          id={`tab-${idx + 1}`}
          onClick={() => {
            setQuestioner(elem);
          }}
        />
        <label htmlFor={`tab-${idx + 1}`}>
          <p>{elem.name}</p>
        </label>
      </React.Fragment>
    );
  });

  return (
    <Container>
      {/* interviewee Nav */}
      <InterviewNav>
        <NavCompo></NavCompo>
        <NavCompo>Pitchit</NavCompo>
        <NavCompo>
          <div>총 시간&nbsp;00:00:00</div>
          <MdOutlineLogout
            className="logOutBtn"
            onClick={() => {
              leaveSession(session, setOV);
              navigate("/room");
            }}
          />
        </NavCompo>
      </InterviewNav>

      <InterviewBody>
        {/* 화상채팅 부분 */}
        <BodyCompo>
          <IntervieweeCompo>
            <CamCompo className="in">
              <UserVideoComponent streamManager={info.publisher} />
            </CamCompo>
            {info.subscribers.map((sub, i) =>
              // sub.stream.connection.connectionId === info.interviewee ? null : (
              JSON.parse(sub.stream.connection.data).clientId.toString() ===
              info.interviewee.toString() ? null : (
                <CamCompo className="in" key={i}>
                  <UserVideoComponent streamManager={sub} />
                </CamCompo>
              )
            )}
            {makeBlank()}
          </IntervieweeCompo>
          <CamCompo>
            <InterviewerTag>면접자</InterviewerTag>
            {info.subscribers.map((sub, i) =>
              // sub.stream.connection.connectionId === info.interviewee ? (
              JSON.parse(sub.stream.connection.data).clientId.toString() ===
              info.interviewee.toString() ? (
                <CamCompo key={i}>
                  <UserVideoComponent streamManager={sub} />
                </CamCompo>
              ) : null
            )}
          </CamCompo>
        </BodyCompo>

        {/* 질문/피드백 박스 */}
        <BodyCompo>
          {/* 질문 박스 */}
          <QuestionBody>
            <SubNav>
              <SubTitle title={"질문 1"} />
              <TipMark>
                <BsQuestionCircleFill />
              </TipMark>
            </SubNav>

            <Question>
              질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문질문
            </Question>

            <SubFooter>
              <GrHistory />
              <SubBtn>질문 끝내기</SubBtn>
            </SubFooter>
          </QuestionBody>

          {/* 평가 */}
          <QuestionBody>
            <SubTitle title={"평가"} />
            <Rating RatingHandler={RatingHandler} />
          </QuestionBody>

          {/* 피드백 */}
          <QuestionBody>
            <SubTitle title={"피드백"} />
            <Feedback placeholder="피드백을 입력하세요" />
          </QuestionBody>
        </BodyCompo>

        {/* 자소서보기/채팅/ */}
        <BodyCompo chatOn={chatOn}>
          {/* 자소서 보기 버튼 */}
          <QuestionBody>
            <SubTitle title={"이희수"} />
            <SubBtn>자소서 보기</SubBtn>
          </QuestionBody>

          {/* 총 질문 모아보기 */}
          <QuestionBody>
            <SubNav>
              <SubTitle title={"질문"} />
            </SubNav>
            <Member>
              {interviewees}
              <MemberColor></MemberColor>
            </Member>
            <AllQuestions onClick={QuestionHandler} chatOn={chatOn}>
              {Questions}
            </AllQuestions>
          </QuestionBody>

          {/* 채팅 */}
          <QuestionBody onClick={chatHandler}>
            <SubTitle title={"채팅"} />
            {chatOn !== false ? (
              <ChatArea session={session} info={info} />
            ) : null}
          </QuestionBody>
        </BodyCompo>
      </InterviewBody>
    </Container>
  );
};

export default IntervieweePage;

const MemberColor = styled.div``;

const Member = styled.div`
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  width: 20.4rem;
  margin-top: 1rem;
  margin-bottom: 0;
  border-radius: 1rem !important;
  display: flex;
  align-items: center;
  position: relative;

  & input {
    display: none;
  }

  & > input:checked + label {
    transition: all 0.5s ease;
    color: var(--primary);
  }

  & label {
    width: 5rem;
    height: 2rem;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--greyDark);
    transition: all 0.5s ease;

    &:hover {
      color: var(--primary);
    }
  }

  ${MemberColor} {
    position: absolute;
    height: 2rem;
    width: 5rem;
    border-radius: 0.8rem !important;
    box-shadow: inset 0.2rem 0.2rem 0.5rem var(--greyLight-2),
      inset -0.2rem -0.2rem 0.5rem var(--white);
    pointer-events: none;
  }

  #tab-1:checked ~ ${MemberColor} {
    transform: translateX(0);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  #tab-2:checked ~ ${MemberColor} {
    transform: translateX(5rem);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  #tab-3:checked ~ ${MemberColor} {
    transform: translateX(10rem);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;

const AllQuestions = styled.div`
  width: 100%;
  height: calc(100% - ${(props) => (props.chatOn ? "35%" : "22%")});
  margin-top: 2vh;
  overflow-y: scroll;
  border-radius: 0 !important;

  & * {
    border-radius: 0 !important;
  }

  &::-webkit-scrollbar {
    width: 7px;
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--greyLight-2);
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--greyLight-1);
  }
`;

const Feedback = styled.textarea`
  width: 100%;
  border-radius: 0 !important;
  border: none;
  margin-top: 2vh;
  margin-right: 1em;
  height: 40vh;
  font-size: 1.2em;
  resize: none;
  outline: none;
`;

const SubBtn = styled.div`
  padding: 0.5em 1.2em;
  font-size: 0.8em;
  width: fit-content;
  border-radius: 1rem;
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;
  font-weight: 600;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  background-color: var(--primary);
  box-shadow: inset 0.1rem 0.1rem 0.5rem var(--primary-light),
    inset -0.1rem -0.1rem 0.5rem var(--primary-dark),
    0.15rem 0.15rem 0.3rem var(--greyLight-2),
    -0.1rem -0.1rem 0.25rem var(--white);

  color: var(--greyLight-1);
  &:hover {
    color: var(--white);
  }

  &:active {
    box-shadow: inset 0.2rem 0.2rem 1rem var(--primary-dark),
      inset -0.2rem -0.2rem 1rem var(--primary-light);
  }
`;

const TipMark = styled.div`
  color: var(--greyLight-2);
  font-size: 1.2em;

  &:hover {
    color: var(--greyDark);
  }
`;

const SubFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2vw;
  align-items: center;
`;

const Question = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionBody = styled.div`
  background-color: white;
  padding-block: 2vh;
  padding-inline: 1.5vw;
`;

const InterviewerTag = styled.div`
  padding: 0.2em 0.6em;
  position: absolute;
  font-weight: 600;
  top: 0.7em;
  left: 1em;
  background: var(--greyLight-1);
  color: var(--primary);
`;

const CamCompo = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntervieweeCompo = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5vw;
  .in {
    * {
      width: 100%;
      height: auto;
    }
  }
`;

const BodyCompo = styled.div`
  --mini-compo: 8vh;
  position: relative;
  height: 84vh;

  &:nth-child(1) {
    margin: 1.5vh 0.5vw 1.5vh 1vw;
    display: grid;
    grid-template-rows: 2fr 7fr;
    gap: 0.5vw;

    div {
      border-radius: 2vw;
    }
  }

  &:nth-child(2) {
    display: grid;
    grid-template-rows: 5fr var(--mini-compo) 7fr;
    gap: 0.5vw;
    margin: 0vh 0.5vw 0vh 0vw;

    div {
      border-radius: 2vw;
    }

    ${QuestionBody}:nth-child(1) {
      display: grid;
      grid-template-rows: 1fr 2fr 1fr;
      background-color: #ffffed;
    }
  }

  &:nth-child(3) {
    display: grid;
    grid-template-rows: var(--mini-compo) ${(props) =>
        props.chatOn ? "37vh 37vh" : "66vh var(--mini-compo)"};
    transition: 0.5s ease-in-out;
    gap: 0.5vw;
    margin: 0vh 1vw 0vh 0vw;

    * {
      border-radius: 2vw;
    }

    ${SubNav} {
      display: block;
    }

    ${QuestionBody} .SubTitle:last-child {
      margin-top: 0.5vh;
    }
  }

  &:nth-child(2) ${QuestionBody}:nth-child(2), &:nth-child(3) ${QuestionBody}:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const NavCompo = styled.div`
  gap: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 20vw;

  &:nth-child(2) {
    font-weight: 600;
    color: var(--primary);
  }

  &:nth-child(3) {
    justify-content: flex-end;

    & * {
      color: var(--greyDark);
    }
  }

  .logOutBtn {
    cursor: pointer;

    &:hover * {
      color: var(--primary);
    }
  }
`;

const InterviewBody = styled.div`
  background-color: var(--greyLight-1);
  height: 90vh;
  margin: 0vh 3vw 4vh 3vw;
  border-radius: 3vw;
  gap: 0.5vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  box-shadow: 0.8rem 0.8rem 1.4rem var(--greyLight-2),
    -0.2rem -0.2rem 1.8rem var(--greyLight-2);
  align-items: center;
  overflow: hidden;

  * {
    border-radius: 3vw;
  }
`;

const InterviewNav = styled.div`
  height: 5vh;
  margin: 1vw 3vw 1vw 3vw;
  padding-inline: 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & svg {
    font-size: 1.3em;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--greyLight-1);

  & .SubTitle {
    font-size: 1em;
    font-weight: bolder;
  }

  & * {
    transition: ease 0.1s;
  }

  & .SubTitle {
    color: var(--textColor);
  }
`;
