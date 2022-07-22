FROM maven:3.8.6-jdk-11 as builder

WORKDIR /app

COPY src src
COPY pom.xml .
COPY config.yml .

RUN mvn -f ./pom.xml clean package

FROM openjdk:11-jre-slim

COPY --from=builder /app/target/simpletodo-1.0-SNAPSHOT.jar /usr/app/simpletodo-1.0-SNAPSHOT.jar

COPY --from=builder /app/config.yml /usr/app/config.yml

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/usr/app/simpletodo-1.0-SNAPSHOT.jar","server","/usr/app/config.yml"]
