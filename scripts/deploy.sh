#!/bin/bash
# Deploy Phong Flash Lab to Bluehost
# Usage: ./scripts/deploy.sh
set -e

cd "$(dirname "$0")/.."

echo "Building..."
npm run build

echo "Deploying to Bluehost..."
SSH_KEY="$HOME/.ssh/geoffjensenssh"
SSH_USER="geoffjen"
SSH_HOST="50.6.53.15"
REMOTE_PATH="~/public_html/iotus/phong/"

rsync -avz --delete -e "ssh -i $SSH_KEY" dist/ "${SSH_USER}@${SSH_HOST}:${REMOTE_PATH}"

echo "Done! Deployed to https://iotus.com/phong"
