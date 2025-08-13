import { Hono } from 'hono'

const health = new Hono()

// Basic health check
health.get('/', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'Agentic Coding Blueprint API',
    version: '1.0.0',
  })
})

// Detailed health check with dependencies
health.get('/detailed', async (c) => {
  const checks = {
    api: 'healthy',
    baml_client: 'unknown',
    database: 'not_applicable',
    external_services: 'not_applicable',
  }

  // Test BAML client import
  try {
    const { b } = await import('../../../baml_client/baml_client')
    checks.baml_client = b ? 'healthy' : 'unhealthy'
  } catch (error) {
    checks.baml_client = 'unhealthy'
  }

  const allHealthy = Object.values(checks).every(status => 
    status === 'healthy' || status === 'not_applicable'
  )

  return c.json({
    status: allHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks,
    service: 'Agentic Coding Blueprint API',
    version: '1.0.0',
  }, allHealthy ? 200 : 503)
})

export default health