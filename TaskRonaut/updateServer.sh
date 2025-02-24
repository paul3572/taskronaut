#!/bin/bash

sh saveDatabase.sh
docker compose down
git pull
docker compose up --build
#sleep 30
sh loadDatabase.sh