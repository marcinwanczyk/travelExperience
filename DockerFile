FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/*.jar world-0.0.1-SNAPSHOT.jar

CMD ["java", "-jar", "world-0.0.1-SNAPSHOT.jar"]
