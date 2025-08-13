import { Hono } from 'hono'
import { BAMLService } from '../services/baml.service'
import { z } from 'zod'

const humanize = new Hono()

// POST /humanize - Full humanization with all options
humanize.post('/', async (c) => {
  try {
    const body = await c.req.json()
    
    // Validate request using Zod
    const validatedRequest = BAMLService.validateHumanizeRequest(body)
    
    // Call BAML service
    const result = await BAMLService.humanizeText(validatedRequest)
    
    return c.json({
      success: true,
      data: result,
    })
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return c.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors,
      }, 400)
    }
    
    // Handle other errors
    console.error('Humanization error:', error)
    return c.json({
      success: false,
      error: 'Failed to humanize text',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500)
  }
})

// POST /humanize/quick - Quick humanization for simple use cases
humanize.post('/quick', async (c) => {
  try {
    const body = await c.req.json()
    
    // Validate request using Zod
    const validatedRequest = BAMLService.validateQuickHumanizeRequest(body)
    
    // Call BAML service
    const result = await BAMLService.quickHumanize(validatedRequest)
    
    return c.json({
      success: true,
      data: {
        original_text: validatedRequest.text,
        humanized_text: result,
        style_applied: validatedRequest.style,
      },
    })
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return c.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors,
      }, 400)
    }
    
    // Handle other errors
    console.error('Quick humanization error:', error)
    return c.json({
      success: false,
      error: 'Failed to humanize text',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, 500)
  }
})

// GET /humanize/styles - Available humanization styles
humanize.get('/styles', (c) => {
  return c.json({
    success: true,
    data: {
      styles: [
        { value: 'CASUAL', label: 'Casual', description: 'Conversational and relaxed tone' },
        { value: 'PROFESSIONAL', label: 'Professional', description: 'Business-appropriate tone' },
        { value: 'ACADEMIC', label: 'Academic', description: 'Scholarly and formal tone' },
        { value: 'CONVERSATIONAL', label: 'Conversational', description: 'Direct and engaging tone' },
        { value: 'TECHNICAL', label: 'Technical', description: 'Precise and informative tone' },
        { value: 'CREATIVE', label: 'Creative', description: 'Imaginative and expressive tone' },
      ],
      length_options: [
        { value: 'PRESERVE', label: 'Preserve', description: 'Keep similar length' },
        { value: 'EXPAND', label: 'Expand', description: 'Add more detail and examples' },
        { value: 'CONDENSE', label: 'Condense', description: 'Make more concise' },
      ],
    },
  })
})

export default humanize