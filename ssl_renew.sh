#!/bin/bash

DOCKER="/usr/bin/docker"

cd /home/ubuntu/happy-day/

$DOCKER sudo docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" --env MONGO_INITDB_ROOT_USERNAME --env MONGO_INITDB_ROOT_PASSWORD --env SECRET --env SENDGRID_API_KEY --env PUBLIC_VAPID_KEY --env PRIVATE_VAPID_KEY -w="$PWD" linuxserver/docker-compose run certbot renew --dry-run && $DOCKER sudo docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" --env MONGO_INITDB_ROOT_USERNAME --env MONGO_INITDB_ROOT_PASSWORD --env SECRET --env SENDGRID_API_KEY --env PUBLIC_VAPID_KEY --env PRIVATE_VAPID_KEY -w="$PWD" linuxserver/docker-compose kill -s SIGHUP nginx
$DOCKER system prune -af