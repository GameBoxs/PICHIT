package com.alppano.speakon.domain.conference.service;

import com.google.gson.JsonObject;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.TrustStrategy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.net.ssl.SSLContext;
import java.io.IOException;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.TimeUnit;

@Service
public class HttpRequestService{

    @Value("${openvidu.OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${openvidu.OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private HttpClient httpClient;

    @PostConstruct
    public void init() {
        // HttpClient 초기화
        String secret = OPENVIDU_SECRET;
        TrustStrategy trustStrategy = (chain, authType) -> true;
        CredentialsProvider provider = new BasicCredentialsProvider();
        UsernamePasswordCredentials credentials = new UsernamePasswordCredentials("OPENVIDUAPP", secret);
        provider.setCredentials(AuthScope.ANY, credentials);

        SSLContext sslContext;
        try {
            sslContext = (new SSLContextBuilder()).loadTrustMaterial((KeyStore)null, trustStrategy).build();
        } catch (NoSuchAlgorithmException | KeyStoreException | KeyManagementException var8) {
            throw new RuntimeException(var8);
        }

        RequestConfig.Builder requestBuilder = RequestConfig.custom();
        requestBuilder = requestBuilder.setConnectTimeout(30000);
        requestBuilder = requestBuilder.setConnectionRequestTimeout(30000);
        httpClient = HttpClientBuilder.create().setDefaultRequestConfig(requestBuilder.build()).setConnectionTimeToLive(30L, TimeUnit.SECONDS).setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE).setSSLContext(sslContext).setDefaultCredentialsProvider(provider).build();
    }

    public HttpResponse broadCastSignal(String session, String type, String data) throws IOException {
        HttpPost request = new HttpPost(OPENVIDU_URL + "openvidu/api/signal");
        request.setHeader("Content-Type", "application/json");

        JsonObject json = new JsonObject();
        json.addProperty("session", session);
        json.addProperty("type", type);
        json.addProperty("data", data);
        StringEntity body = new StringEntity(json.toString(), "UTF-8");
        request.setEntity(body);

        HttpResponse response = httpClient.execute(request);
        request.releaseConnection();

        return response;
    }
}
