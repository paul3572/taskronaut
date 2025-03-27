#!/bin/bash

ENV_FILE="./backend/.env"
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

db_container_name="${MYSQL_HOST}"
DB_USER="${MYSQL_USER}"
DB_PASSWORD="${MYSQL_PASSWORD}"
DB_NAME="${MYSQL_DATABASE}"
SQL_QUERY="SELECT * FROM Users;"

if [ -n "$DB_PASSWORD" ]; then
    exec docker exec -it "$db_container_name" mysql -u "$DB_USER" -p"$DB_PASSWORD" -e "USE $DB_NAME; $SQL_QUERY;"
else
    exec docker exec -it "$db_container_name" mysql -u "$DB_USER" -e "USE $DB_NAME; $SQL_QUERY;"
fi
