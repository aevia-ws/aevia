#!/bin/bash
# Deploy aevia hub to Vercel production
# Usage: ./deploy.sh

set -e
VTOKEN=$(grep VERCEL_API_TOKEN /Users/milliandvalentin/skybot-inbox/.env | cut -d= -f2)

echo "🚀 Deploying aevia to Vercel..."
DEPLOY_OUTPUT=$(vercel deploy --prod --token="$VTOKEN" --yes --cwd "$(dirname "$0")" 2>&1)
echo "$DEPLOY_OUTPUT" | tail -5

# Extract deployment UID and re-alias aevia.vercel.app
DEPLOY_UID=$(curl -s "https://api.vercel.com/v6/deployments?projectId=prj_l0Nuokxgag6b4asiwkhmZZY4VLNI&limit=1" \
  -H "Authorization: Bearer $VTOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['deployments'][0]['uid'])")

curl -s -X POST "https://api.vercel.com/v2/deployments/$DEPLOY_UID/aliases" \
  -H "Authorization: Bearer $VTOKEN" \
  -H "Content-Type: application/json" \
  -d '{"alias":"aevia.vercel.app"}' | python3 -c "import sys,json; d=json.load(sys.stdin); print('✅ Alias:', d.get('alias','?'))"
