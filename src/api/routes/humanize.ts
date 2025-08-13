import { Hono } from 'hono'
import { WorkersAIService } from '../services/workers-ai.service'
import { z } from 'zod'
import type { Env } from '../../worker'

const humanize = new Hono<{ Bindings: Env }>()

// POST /humanize - Full humanization with all options
humanize.post('/', async (c) => {
  try {
    const body = await c.req.json()
    
    // Validate request using Zod
    const validatedRequest = WorkersAIService.validateHumanizeRequest(body)
    
    // Call Workers AI service
    const result = await WorkersAIService.humanizeText(validatedRequest, c.env)
    
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
    const validatedRequest = WorkersAIService.validateQuickHumanizeRequest(body)
    
    // Call Workers AI service
    const result = await WorkersAIService.quickHumanize(validatedRequest, c.env)
    
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

// POST /humanize/stream - Streaming humanization with real-time updates
humanize.post('/stream', async (c) => {
  try {
    const body = await c.req.json()
    const validatedRequest = WorkersAIService.validateHumanizeRequest(body)
    
    // Set headers for Server-Sent Events
    c.header('Content-Type', 'text/event-stream')
    c.header('Cache-Control', 'no-cache')
    c.header('Connection', 'keep-alive')
    c.header('Access-Control-Allow-Origin', '*')
    c.header('Access-Control-Allow-Headers', 'Content-Type')
    c.header('Access-Control-Allow-Methods', 'POST, OPTIONS')
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          console.log('Starting stream for:', validatedRequest.text.substring(0, 50))
          
          // Send initial start marker
          const startData = JSON.stringify({ 
            success: true, 
            started: true,
            message: 'Starting humanization...'
          })
          controller.enqueue(new TextEncoder().encode(`data: ${startData}\n\n`))
          
          let chunkCount = 0
          for await (const partial of WorkersAIService.humanizeTextStream(validatedRequest, c.env)) {
            chunkCount++
            console.log(`Sending chunk ${chunkCount}:`, partial.humanized_text?.substring(0, 50))
            
            const data = JSON.stringify({ 
              success: true, 
              data: partial, 
              partial: true 
            })
            controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`))
          }
          
          console.log(`Stream completed with ${chunkCount} chunks`)
          
          // Send final completion marker
          const finalData = JSON.stringify({ 
            success: true, 
            completed: true 
          })
          controller.enqueue(new TextEncoder().encode(`data: ${finalData}\n\n`))
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          const errorData = JSON.stringify({
            success: false,
            error: 'Failed to stream humanized text',
            message: error instanceof Error ? error.message : 'Unknown error'
          })
          controller.enqueue(new TextEncoder().encode(`data: ${errorData}\n\n`))
          controller.close()
        }
      }
    })
    
    return new Response(stream)
  } catch (error) {
    console.error('Stream setup error:', error)
    if (error instanceof z.ZodError) {
      return c.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, 400)
    }
    
    return c.json({
      success: false,
      error: 'Failed to setup stream',
      message: error instanceof Error ? error.message : 'Unknown error'
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