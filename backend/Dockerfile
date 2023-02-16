FROM adoptopenjdk/openjdk11
WORKDIR /usr/app
COPY build/libs/*.jar pitichit_rest-api.jar
EXPOSE 8815
CMD ["java", "-jar", "pitichit_rest-api.jar"]