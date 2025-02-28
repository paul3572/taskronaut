#!/bin/bash

# MySQL-Login-Informationen
CONTAINER_NAME="taskronaut-datenbank-1"
DB_USER="root"
DB_NAME="TaskRonaut"

# MySQL-Befehl zum Abrufen der Benutzer
SQL_QUERY="SELECT * FROM Users;"

# In den MySQL-Container einloggen und das Query ausführen
exec docker exec -it "$CONTAINER_NAME" mysql -u "$DB_USER" -e "USE $DB_NAME; $SQL_QUERY;"