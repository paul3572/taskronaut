#!/bin/bash

# Konfiguration
db_container_name="taskronaut-datenbank-1"
db_user="root"
db_name="TaskRonaut"
backup_file="backup.sql"

rm $backup_file
echo "Backup-Datei wurde gelöscht."

# Backup durchführen
docker exec -i $db_container_name mysqldump -u $db_user --databases $db_name > $backup_file

# Erfolgsmeldung
echo "Backup gespeichert als $backup_file"
