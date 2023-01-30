import axios from "axios";

// export const APPLICATION_SERVER_URL = "http://192.168.100.188:8080/";
export const APPLICATION_SERVER_URL = "https://i8d107.p.ssafy.io/api/";

// 인터뷰 설정 함수
export const selectInterviwee = async (connectionId, mySessionId) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL + "conference/interview/interviewee",
    {
      session: mySessionId,
      interviewee: connectionId
    },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

export const getToken = async (mySessionId) => {
  const sessionId = await createSession(mySessionId);
  return await createToken(sessionId);
};

const createSession = async (sessionId) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL + "conference/sessions",
    { customSessionId: sessionId },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data; // 리턴 값은 SessionId
};

const createToken = async (sessionId) => {
  const response = await axios.post(
    APPLICATION_SERVER_URL + "conference/sessions/connections/" + sessionId,
    {},
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data; // 리턴 값은 Token
};

export const leaveSession = (session, handler) => {
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    handler(null);
  };