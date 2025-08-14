import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import healthRoutes from './api/routes/health'
import humanizeRoutes from './api/routes/humanize'

export interface Env {
  ASSETS: Fetcher;
  OPENAI_API_KEY: string;
  ANTHROPIC_API_KEY: string;
  GOOGLE_API_KEY: string;
  BOUNDARY_PROJECT_ID?: string;
  BOUNDARY_SECRET?: string;
}

// Create Hono app for API routes
const api = new Hono<{ Bindings: Env }>()

// API Middleware
api.use('*', logger())
api.use('*', cors({
  origin: '*', // Allow all origins for Workers deployment
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
}))

// API Routes
api.route('/health', healthRoutes)
api.route('/humanize', humanizeRoutes)

// API Root route
api.get('/', (c) => {
  return c.json({
    message: 'Agentic Coding Blueprint API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      humanize: '/api/humanize',
    },
  })
})

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname.startsWith('/api')) {
      // Remove /api prefix and route to Hono app
      const apiPath = url.pathname.substring(4) || '/';
      const apiRequest = new Request(
        new URL(apiPath, url.origin),
        request
      );
      return api.fetch(apiRequest, env);
    }
    
    // Check if this is a request for a static asset
    const isStaticAsset = url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|json|xml|txt|pdf|zip|webmanifest)$/i);
    
    if (isStaticAsset) {
      // Serve static assets directly
      return await env.ASSETS.fetch(request);
    }
    
    // For all other requests (SPA routes), serve index.html directly without checking ASSETS first
    // This prevents 307 redirects that the ASSETS binding might return for non-existent paths
    const indexRequest = new Request(new URL('/index.html', url.origin), {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
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