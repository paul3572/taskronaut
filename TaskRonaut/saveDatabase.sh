#!/bin/bash

db_container_name="datenbank"
db_user="root"
db_name="TaskRonaut"
backup_file="backup.sql"

rm $backup_file
echo "Backup-Datei wurde gelöscht."

docker exec -i $db_container_name mysqldump -u $db_user --databases $db_name > $backup_file

echo "Backup gespeichert als $backup_file"
