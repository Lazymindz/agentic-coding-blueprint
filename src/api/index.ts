import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import healthRoutes from './routes/health'
import humanizeRoutes from './routes/humanize'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors({
  origin: ['http://localhost:8080', 'http://localhost:3000'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
}))

// Health check route (no /api prefix here, it's added by proxy)
app.route('/health', healthRoutes)
app.route('/humanize', humanizeRoutes)

// Root route
app.get('/', (c) => {
  return c.json({
    message: 'Agentic Coding Blueprint API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      humanize: '/humanize',
    },
  })
})

export default app