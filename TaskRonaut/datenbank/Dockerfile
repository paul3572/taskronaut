FROM ubuntu:latest
LABEL authors="paulp"

ENTRYPOINT ["top", "-b"]

FROM mysql:8.0

COPY Schema.sql /docker-entrypoint-initdb.d/
COPY Testdaten.sql /docker-entrypoint-initdb.d/

# Optional: Ändere das MySQL-Passwort
ENV MYSQL_ROOT_PASSWORD=''