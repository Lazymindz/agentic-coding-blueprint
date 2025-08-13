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