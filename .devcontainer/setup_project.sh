#!/bin/bash

set -eu -o pipefail
set -x

export DDEV_NONINTERACTIVE=true

ddev config global --omit-containers=ddev-router
ddev debug download-images

ddev stop -a
ddev start -y

npm config set "//npm.fontawesome.com/:_authToken" $NPM_FONTAWESOME_AUTH_TOKEN
composer config --global http-basic.satispress.generodigital.com $SATISPRESS_API_KEY $SATISPRESS_PASSWORD
composer config --global github-oauth.github.com $GITHUB_TOKEN

cp .env.example .env
sed -i "s/WP_HOME=.*/WP_HOME='https:\/\/$CODESPACE_NAME-8080.$GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN'/" .env

mkdir -p ~/.ssh
chmod 700 ~/.ssh
