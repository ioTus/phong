#!/bin/bash
# Deploy Phong Flash Lab to Bluehost
# Usage: ./scripts/deploy.sh
set -e

cd "$(dirname "$0")/.."

echo "Building..."
npm run build

echo "Deploying to Bluehost..."
# TODO: Fill in SSH_USER and SSH_HOST after Bluehost setup
SSH_USER="${PHONG_SSH_USER:-CHANGEME}"
SSH_HOST="${PHONG_SSH_HOST:-CHANGEME}"
REMOTE_PATH="${PHONG_REMOTE_PATH:-~/public_html/phong/}"

if [ "$SSH_USER" = "CHANGEME" ] || [ "$SSH_HOST" = "CHANGEME" ]; then
  echo "Error: Set PHONG_SSH_USER and PHONG_SSH_HOST environment variables,"
  echo "or edit the defaults in this script."
  exit 1
fi

rsync -avz --delete dist/ "${SSH_USER}@${SSH_HOST}:${REMOTE_PATH}"

echo "Done! Deployed to https://iotus.com/phong"
