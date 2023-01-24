package com.alppano.speakon.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .version("v0.1.1")
                .title("Speak On - Rest API")
                .description("Speak On 의 Rest API 문서입니다.");

        return new OpenAPI()
                .info(info);
    }

}
