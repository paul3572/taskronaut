#!/bin/bash

sh saveDatabase.sh
docker compose down
git pull
docker compose up --build -d
sleep 20
sh loadDatabase.sh