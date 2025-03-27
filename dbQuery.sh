#!/bin/bash

CONTAINER_NAME="datenbank"
DB_USER="root"
DB_NAME="TaskRonaut"

SQL_QUERY="SELECT * FROM Users;"

exec docker exec -it "$CONTAINER_NAME" mysql -u "$DB_USER" -e "USE $DB_NAME; $SQL_QUERY;"