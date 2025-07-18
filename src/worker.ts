export interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Serve static assets from the dist directory
    const response = await env.ASSETS.fetch(request);
    
    // If the asset exists and is not an HTML file, return it as-is
    if (response.status !== 404 && !url.pathname.endsWith('.html') && !url.pathname.match(/\/$/)) {
      return response;
    }
    
    // For SPA routing: serve index.html for all non-asset routes
    const indexRequest = new Request(new URL('/index.html', url), request);
    const indexResponse = await env.ASSETS.fetch(indexRequest);
    
    // Add security headers
    const headers = new Headers(indexResponse.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'DENY');
    headers.set('X-XSS-Protection', '1; mode=block');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    return new Response(indexResponse.body, {
      status: indexResponse.status,
      statusText: indexResponse.statusText,
      headers,
    });
  },
};