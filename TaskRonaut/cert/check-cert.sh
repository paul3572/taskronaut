#!/bin/sh

echo "$(certbot certificates)"

expiry_date=$(certbot certificates | grep "Expiry Date:" | awk '{print $3}')
echo "Ablaufdatum: $expiry_date"

current_date=$(date +'%Y-%m-%d')
echo "Aktuelles Datum: $current_date"

if [ "$current_date" \< "$expiry_date" ]; then
  echo "Zertifikat ist gültig."
else
  echo "neues Zertifikat wird erstellt"
  certbot renew --webroot -w /var/www/certbot --force-renewal --email paul.schreiber@it.htl-hl.ac.at -d taskronaut.at --agree-tos
fi