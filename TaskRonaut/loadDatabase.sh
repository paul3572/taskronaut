#!/bin/bash

# Konfiguration
db_container_name="datenbank"
db_user="root"
db_name="TaskRonaut"
backup_file="backup.sql"


# Wiederherstellung der Datenbank
echo "Wiederherstellung der Datenbank wird gestartet..."
docker exec -i $db_container_name mysql -u $db_user $db_name < $backup_file
echo "Datenbank wurde erfolgreich wiederhergestellt."

