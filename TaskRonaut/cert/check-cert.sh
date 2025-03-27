#!/bin/sh

if certbot certificates | grep "Expiry Date: $(date -d "+60 days" +'%Y-%m-%d')"; then
  echo "Zertifikat ist gültig."
else
  echo "neues Zertifikat wird erstellt"
  certbot renew --webroot -w /var/www/certbot --force-renewal --email paul.schreiber@it.htl-hl.ac.at -d taskronaut.at --agree-tos
fi