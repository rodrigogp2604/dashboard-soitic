#!/bin/bash

cd /var/www/html

composer install --no-interaction

echo "Aguardando MySQL..."
until php -r "new PDO('mysql:host=${DB_HOST};dbname=${DB_NAME}', '${DB_USER}', '${DB_PASSWORD}');" 2>/dev/null; do
    sleep 2
done
echo "MySQL pronto!"

php migrate.php
php seed.php

apache2-foreground