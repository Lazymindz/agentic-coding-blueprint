import { b } from '../../../baml_client/baml_client'
import { z } from 'zod'
import type { 
  HumanizationRequest, 
  HumanizedText, 
  TextStyle, 
  TextLength 
} from '../../../baml_client/baml_client/types'

// Zod schemas for API validation
export const humanizeRequestSchema = z.object({
  text: z.string().min(1, 'Text is required').max(10000, 'Text must be less than 10,000 characters'),
  style: z.enum(['CASUAL', 'PROFESSIONAL', 'ACADEMIC', 'CONVERSATIONAL', 'TECHNICAL', 'CREATIVE']).optional().default('CONVERSATIONAL'),
  length: z.enum(['PRESERVE', 'EXPAND', 'CONDENSE']).optional().default('PRESERVE'),
  preserve_technical_terms: z.boolean().optional().default(true),
  target_audience: z.string().optional(),
})

export const quickHumanizeRequestSchema = z.object({
  text: z.string().min(1, 'Text is required').max(5000, 'Text must be less than 5,000 characters'),
  style: z.enum(['CASUAL', 'PROFESSIONAL', 'ACADEMIC', 'CONVERSATIONAL', 'TECHNICAL', 'CREATIVE']).optional().default('CASUAL'),
})

export type HumanizeRequestInput = z.infer<typeof humanizeRequestSchema>
export type QuickHumanizeRequestInput = z.infer<typeof quickHumanizeRequestSchema>

/**
 * Service class for BAML text humanization operations
 */
export class BAMLService {
  /**
   * Humanize text using the main BAML function with detailed options
   */
  static async humanizeText(request: HumanizeRequestInput): Promise<HumanizedText> {
    const bamlRequest: HumanizationRequest = {
      text: request.text,
      style: request.style as TextStyle,
      length: request.length as TextLength,
      preserve_technical_terms: request.preserve_technical_terms,
      target_audience: request.target_audience || undefined,
    }
    
    try {
      return await b.HumanizeText(bamlRequest)
    } catch (error) {
      // Fallback to the alternative function if primary fails
      console.warn('Primary humanization failed, trying fallback:', error)
      return await b.HumanizeTextWithFallback(bamlRequest)
    }
  }

  /**
   * Quick humanization for shorter texts with minimal configuration
   */
  static async quickHumanize(request: QuickHumanizeRequestInput): Promise<string> {
    return await b.QuickHumanize(request.text, request.style as TextStyle)
  }

  /**
   * Validate a humanization request using Zod
   */
  static validateHumanizeRequest(data: unknown): HumanizeRequestInput {
    return humanizeRequestSchema.parse(data)
  }

  /**
   * Validate a quick humanization request using Zod
   */
  static validateQuickHumanizeRequest(data: unknown): QuickHumanizeRequestInput {
    return quickHumanizeRequestSchema.parse(data)
  }
}