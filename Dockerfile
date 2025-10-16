FROM maven:3.9.4-openjdk-17-slim AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app
COPY --from=build /app/target/world-0.0.1-SNAPSHOT.jar ./app.jar

EXPOSE ${PORT:-8080}

CMD java -Dserver.port=${PORT:-8080} -jar app.jar
