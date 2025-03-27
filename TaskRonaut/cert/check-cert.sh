#!/bin/sh

expiry_date=$(date -d "$(certbot certificates | grep "Expiry Date:" | awk '{print $4}') -60 days" +'%Y-%m-%d')

current_date=$(date +'%Y-%m-%d')

if [ "$current_date" \< "$expiry_date" ]; then
  echo "Zertifikat ist gültig."
else
  certbot renew --webroot -w /var/www/certbot --force-renewal --email paul.schreiber@it.htl-hl.ac.at -d taskronaut.at --agree-tos
fi