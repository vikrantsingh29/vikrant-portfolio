# Visitor Counter Setup Guide

## Overview
The visitor counter has been updated to track real-time visitors using a Cloudflare Worker backend with KV storage. This eliminates the fake "1200" counter that resets and provides accurate, persistent visitor tracking.

## Architecture
- **Frontend**: React component (`src/ui/VisitorCounter.jsx`)
- **Backend**: Cloudflare Worker (`worker.js`)
- **Storage**: Cloudflare KV (Key-Value storage)
- **Fallback**: Session-based tracking using sessionStorage + localStorage

## Setup Instructions

### Option 1: Cloudflare Worker (Recommended for Production)

#### Prerequisites
- Cloudflare account (free tier works fine)
- Node.js and npm installed
- Wrangler CLI installed globally: `npm install -g wrangler`

#### Step 1: Create Cloudflare KV Namespace
```bash
# Login to Cloudflare
wrangler login

# Create KV namespace for visitor count
wrangler kv:namespace create "VISITOR_COUNT"
```

This will output a namespace ID like: `{ id = "abc123def456..." }`

#### Step 2: Update wrangler.toml
Open `wrangler.toml` and replace `YOUR_KV_NAMESPACE_ID_HERE` with the actual KV namespace ID from step 1.

#### Step 3: Deploy the Worker
```bash
# Deploy to Cloudflare Workers
wrangler deploy
```

After deployment, you'll get a worker URL like:
`https://vikrant-portfolio-visitor-counter.YOUR_SUBDOMAIN.workers.dev`

#### Step 4: Configure Environment Variable
Create or update `.env` file in the project root:
```env
VITE_VISITOR_COUNTER_API=https://vikrant-portfolio-visitor-counter.YOUR_SUBDOMAIN.workers.dev
```

Add this to your GitHub repository secrets if deploying via GitHub Actions:
- Name: `VITE_VISITOR_COUNTER_API`
- Value: Your actual worker URL

#### Step 5: Build and Deploy Portfolio
```bash
npm run build
npm run deploy
```

### Option 2: Use Fallback Mode (Quick Setup)

If you don't want to set up Cloudflare Workers immediately, the visitor counter will automatically fall back to session-based tracking:

- Uses `sessionStorage` to track unique browser sessions
- Persists count in `localStorage`
- Provides better tracking than the old hardcoded "1200" method
- Starts from 0 and increments with each unique session

**Note**: Fallback mode is browser-specific and won't track visitors across different devices, but it's much better than the old fake counter.

## How It Works

### Production Mode (with Cloudflare Worker)
1. When a user visits the portfolio, the component calls the Worker API
2. The Worker increments the count in KV storage
3. Returns the updated count to display
4. Count persists globally across all visitors and browsers

### Fallback Mode (without Worker API)
1. Checks if current browser session is new using `sessionStorage`
2. If new session, generates unique session ID
3. Increments count in `localStorage`
4. Count persists within the browser only

## API Endpoints

### GET /api/visitors
Increments and returns the visitor count.

**Response:**
```json
{
  "success": true,
  "count": 1234
}
```

### GET /api/visitors/get
Returns current count without incrementing.

**Response:**
```json
{
  "success": true,
  "count": 1234
}
```

## Testing

### Test the Worker Locally
```bash
# Start local development server
wrangler dev

# In another terminal, test the endpoint
curl http://localhost:8787/api/visitors
```

### Test in Browser
1. Open browser DevTools → Network tab
2. Load your portfolio
3. Check for request to `/api/visitors`
4. Verify response contains visitor count

## Troubleshooting

### Worker API not responding
- Check that the Worker is deployed: `wrangler deployments list`
- Verify the Worker URL in `.env` is correct
- Check Cloudflare dashboard for any error logs

### Count not incrementing
- Clear browser cache and cookies
- Check browser console for error messages
- Verify KV namespace is properly configured in `wrangler.toml`

### "Unavailable" displayed
- This means both Worker API and fallback failed
- Check network connectivity
- Verify browser allows localStorage/sessionStorage

## Cost Considerations

Cloudflare Workers Free Tier:
- 100,000 requests per day
- 128 MB memory
- More than sufficient for a portfolio site

## Benefits of New System

✅ **Real tracking**: Counts actual visitors across all devices
✅ **Persistent**: Data stored in cloud, never resets
✅ **No fake numbers**: Starts from actual visit count
✅ **Reliable**: Cloudflare's global network ensures high availability
✅ **Free**: Uses Cloudflare's generous free tier
✅ **Fallback**: Gracefully degrades if API unavailable

## Migration Notes

The old system:
- ❌ Hardcoded starting value of 1200
- ❌ Browser-specific (localStorage only)
- ❌ Reset when cache cleared
- ❌ Fake visitor numbers

The new system:
- ✅ No hardcoded values
- ✅ Global across all visitors
- ✅ Persistent in cloud storage
- ✅ Real visitor tracking

## Next Steps

1. Deploy the Cloudflare Worker (recommended)
2. Add Worker URL to environment variables
3. Rebuild and deploy your portfolio
4. Monitor visitor count in real-time

For questions or issues, refer to:
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
