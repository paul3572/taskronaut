#!/bin/bash

# Variables
EMAIL="noreply@taskronaut.at"
PASSWORD="MeinSehrStarkesPasswort"
POSTFIX_ACCOUNTS_FILE="./emailconf/postfix-accounts.cf"

if ! command -v mkpasswd &> /dev/null; then
  echo "mkpasswd is not installed."
  exit 1
fi

echo "Hashing password..."
HASHED_PASSWORD=$(mkpasswd -m sha-512 "$PASSWORD")

echo "Updating $POSTFIX_ACCOUNTS_FILE with hashed password for $EMAIL"
echo "$EMAIL|$HASHED_PASSWORD" > "$POSTFIX_ACCOUNTS_FILE"

echo "Successfully updated $POSTFIX_ACCOUNTS_FILE"