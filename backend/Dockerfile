FROM adoptopenjdk/openjdk11
WORKDIR /usr/app
COPY build/libs/*.jar speakon-dev_rest-api.jar
EXPOSE 8811
CMD ["java", "-jar", "speakon-dev_rest-api.jar"]