package com.alppano.speakon.domain.conference.service;

import org.apache.http.HttpResponse;

public interface HttpRequestService {
    /**
     OpenVidu 서버에 BroadCast 요청 날리기
     @param session 요청을 날릴 세션
     @param type 요청 구분을 위한 타입
     @param data 전파할 데이터
     */
    HttpResponse broadCastSignal(String session, String type, String data) throws Exception;
}
