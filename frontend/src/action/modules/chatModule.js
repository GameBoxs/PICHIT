import axios from "axios";

// export const APPLICATION_SERVER_URL = "http://192.168.100.188:8080/";
export const APPLICATION_SERVER_URL = "https://i8d107.p.ssafy.io/api/";

// 인터뷰 설정 함수
export const selectInterviwee = async (intervieweeId, interviewRoomId, myToken) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL + "conference/interview/interviewee",
    {
      "interviewRoomId": interviewRoomId,
      "intervieweeId": intervieweeId,
      "questionId" : ""
    },
    { headers: { "Content-Type": "application/json" , "Authorization":myToken} }
  );
  return response.data;
};

export const getToken = async (roomId,myToken) => {
  // const sessionId = await createSession(mySessionId);
  // return await createToken(sessionId);
  const response = await axios.get(
    APPLICATION_SERVER_URL + "conference/sessions/connections/" + roomId,
    {
      headers: { "Content-Type": "application/json", "Authorization":myToken },
    }
  );

  return response.data; // 리턴 값은 Token
};

export const createSession = async (roomId, myToken) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL + "conference/sessions" + roomId,
    {},
    {
      headers: { "Content-Type": "application/json", "Authorization":myToken },
    }
  );

  return response.data; // 리턴 값은 SessionId
};

// const createToken = async (sessionId, myToken) => {
//   const response = await axios.get(
//     APPLICATION_SERVER_URL + "conference/sessions/connections/" + sessionId,
//     {
//       headers: { "Content-Type": "application/json", "Authorization":myToken },
//     }
//   );

//   return response.data; // 리턴 값은 Token
// };

export const leaveSession = (session, handler) => {
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    handler(null);
  };