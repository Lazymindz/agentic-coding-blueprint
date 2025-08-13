import { serve } from '@hono/node-server'
import app from './index'

const port = 3001

console.log(`🚀 API Server starting on http://localhost:${port}`)
console.log(`📋 API Documentation: http://localhost:${port}`)
console.log(`🏥 Health Check: http://localhost:${port}/health`)

serve({
  fetch: app.fetch,
  port,
})

console.log(`✅ API Server running on http://localhost:${port}`)