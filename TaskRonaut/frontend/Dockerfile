FROM ubuntu:latest
LABEL authors="paulp"

ENTRYPOINT ["top", "-b"]

FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html