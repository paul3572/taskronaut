#!/bin/bash

ENV_FILE="./backend/.env"
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

db_container_name="${MYSQL_HOST}"
db_user="${MYSQL_USER}"
db_password="${MYSQL_PASSWORD}"
db_name="${MYSQL_DATABASE}"
backup_file="backup.sql"


echo "Wiederherstellung der Datenbank wird gestartet..."

if [ -n "$db_password" ]; then
    docker exec -i "$db_container_name" mysql -u "$db_user" -p"$db_password" "$db_name" < "$backup_file"
else
    docker exec -i "$db_container_name" mysql -u "$db_user" "$db_name" < "$backup_file"
fi

echo "Datenbank wurde erfolgreich wiederhergestellt."
