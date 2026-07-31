FROM node:22 AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build


FROM maven:3.9-eclipse-temurin-21 AS backend-build

WORKDIR /app

COPY demo/pom.xml .

COPY demo/src ./src

COPY --from=frontend-build /frontend/dist ./src/main/resources/static

RUN mvn clean package -DskipTests


FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

COPY --from=backend-build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]