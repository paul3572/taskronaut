FROM ubuntu:latest
LABEL authors="paulp"

ENTRYPOINT ["top", "-b"]

FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.mjs"]