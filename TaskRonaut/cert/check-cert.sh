#!/bin/sh

# Zertifikatsinformationen ausgeben
echo "$(certbot certificates)"

# Ablaufdatum abrufen und in ein Format umwandeln, das von date verstanden wird
expiry_date=$(certbot certificates | grep "Expiry Date:" | awk '{print $4" "$5}')
echo "Ablaufdatum: $expiry_date"

# Aktuelles Datum in 60 Tagen berechnen
check_date=$(date -d "$(echo $expiry_date) -60 days" +'%Y-%m-%d')
echo "Checkdatum: $check_date"

# Aktuelles Datum abrufen
current_date=$(date +'%Y-%m-%d')
echo "Aktuelles Datum: $current_date"

# Gültigkeit prüfen
if [ "$current_date" \< "$check_date" ]; then
  echo "Zertifikat ist gültig."
else
  echo "neues Zertifikat wird erstellt"
  # certbot renew --webroot -w /var/www/certbot --force-renewal --email paul.schreiber@it.htl-hl.ac.at -d taskronaut.at --agree-tos
fi