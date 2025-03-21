#!/bin/bash

# Variables
EMAIL="noreply@taskronaut.at"
PASSWORD="MeinSehrStarkesPasswort"
POSTFIX_ACCOUNTS_FILE="./emailconf/postfix-accounts.cf"

echo "Hashing password..."
HASHED_PASSWORD=$(openssl passwd -salt "$(openssl rand -base64 16)" -6 "$PASSWORD")

echo "Updating $POSTFIX_ACCOUNTS_FILE with hashed password for $EMAIL"
echo "$EMAIL|$HASHED_PASSWORD" > "$POSTFIX_ACCOUNTS_FILE"

echo "Successfully updated $POSTFIX_ACCOUNTS_FILE"