import { Hono } from 'hono'
import type { Env } from '../../worker'

const health = new Hono<{ Bindings: Env }>()

// Basic health check
health.get('/', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: 'N/A (Workers runtime)',
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

  // Test environment variables for AI APIs
  const hasOpenAI = !!c.env.OPENAI_API_KEY
  const hasAnthropic = !!c.env.ANTHROPIC_API_KEY
  const hasGemini = !!c.env.GOOGLE_API_KEY
  
  if (hasOpenAI || hasAnthropic || hasGemini) {
    checks.baml_client = 'healthy'
  } else {
    checks.baml_client = 'unhealthy - no API keys configured'
  }

  const allHealthy = Object.values(checks).every(status => 
    status === 'healthy' || status === 'not_applicable'
  )

  return c.json({
    status: allHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: 'N/A (Workers runtime)',
    providers: {
      openai: hasOpenAI ? 'configured' : 'missing',
      anthropic: hasAnthropic ? 'configured' : 'missing',
      gemini: hasGemini ? 'configured' : 'missing',
    },
    checks,
    service: 'Agentic Coding Blueprint API',
    version: '1.0.0',
  }, allHealthy ? 200 : 503)
})

export default health