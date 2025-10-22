// Cloudflare Worker for tracking visitor counts
// This worker uses Cloudflare KV to store and retrieve visitor counts

export default {
    async fetch(request, env) {
        // Handle CORS preflight requests
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            });
        }

        const url = new URL(request.url);
        
        // Handle visitor count endpoint
        if (url.pathname === '/api/visitors') {
            try {
                // Get current count from KV storage
                let count = await env.VISITOR_COUNT.get('total_visitors');
                
                if (count === null) {
                    // Initialize counter if it doesn't exist
                    count = 0;
                }
                
                // Increment the counter for each visit
                const newCount = parseInt(count) + 1;
                
                // Store the updated count
                await env.VISITOR_COUNT.put('total_visitors', newCount.toString());
                
                // Return the count as JSON
                return new Response(JSON.stringify({
                    success: true,
                    count: newCount
                }), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Cache-Control': 'no-cache'
                    }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            }
        }
        
        // Handle get count without incrementing
        if (url.pathname === '/api/visitors/get') {
            try {
                let count = await env.VISITOR_COUNT.get('total_visitors');
                
                if (count === null) {
                    count = 0;
                }
                
                return new Response(JSON.stringify({
                    success: true,
                    count: parseInt(count)
                }), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Cache-Control': 'no-cache'
                    }
                });
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            }
        }

        // Default response for other paths
        return new Response('Visitor Counter API', {
            headers: {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
};
