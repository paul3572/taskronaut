#!/bin/bash

# Variables
EMAIL="noreply@taskronaut.at"
PASSWORD="MeinSehrStarkesPasswort"
POSTFIX_ACCOUNTS_FILE="./emailconf/postfix-accounts.cf"

# Hash the password using doveadm
HASHED_PASSWORD=$(docker run --rm tvial/docker-mailserver:latest doveadm pw -s SHA512-CRYPT -p "$PASSWORD")

# Update the postfix-accounts.cf file
echo "$EMAIL|$HASHED_PASSWORD" > "$POSTFIX_ACCOUNTS_FILE"

echo "Updated $POSTFIX_ACCOUNTS_FILE with hashed password for $EMAIL"