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

rm $backup_file
echo "Backup-Datei wurde gelöscht."

if [ -n "$db_password" ]; then
    docker exec -i $db_container_name mysqldump -u "$db_user" -p"$db_password" --databases "$db_name" > "$backup_file"
else
    docker exec -i $db_container_name mysqldump -u "$db_user" --databases "$db_name" > "$backup_file"
fi

echo "Backup gespeichert als $backup_file"
