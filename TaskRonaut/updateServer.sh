#!/bin/bash

sh saveDatabase.sh
docker compose down
git pull
sh hash-password.sh
docker compose up --build -d
sleep 20
sh loadDatabase.sh