import { z } from 'zod'
import type { Env } from '../../worker'
import type { 
  HumanizationRequest, 
  HumanizedText, 
  StreamingHumanizedText,
  TextStyle, 
  TextLength 
} from './types'

// Zod schemas for API validation using string literals to avoid enum reference issues
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
 * Workers-compatible AI service with direct API calls
 */
export class WorkersAIService {
  
  /**
   * Generate humanization prompt with specified style
   */
  private static generatePrompt(request: HumanizationRequest): string {
    const styleInstructions = {
      'CASUAL': 'Use conversational tone, contractions, and informal language. Include relatable examples and analogies. Make it feel like a friendly conversation.',
      'PROFESSIONAL': 'Maintain professional tone while being approachable. Use clear, direct language. Include relevant examples and insights.',
      'ACADEMIC': 'Use scholarly tone with precise language. Include proper transitions and logical flow. Maintain formality while being accessible.',
      'CONVERSATIONAL': 'Write as if speaking directly to the reader. Use questions and direct address ("you", "your"). Include natural speech patterns and rhythm.',
      'TECHNICAL': 'Maintain technical accuracy while improving readability. Add explanations for complex concepts. Use clear, logical structure.',
      'CREATIVE': 'Use engaging language and creative expressions. Include metaphors, analogies, and vivid descriptions. Make it memorable and interesting.'
    }

    const lengthInstructions = {
      'PRESERVE': 'Keep similar length to original',
      'EXPAND': 'Add detail, examples, and elaboration (20-50% longer)',
      'CONDENSE': 'Remove redundancy while keeping key points (20-30% shorter)'
    }

    return `You are the "Every Style Guide Editor" and expert text humanizer. Your task is to take AI-generated or robotic text and make it sound more human, natural, and engaging while rigorously applying the "Every" style guide rules.

## Input Text:
${request.text}

## Humanization Requirements:
- Style: ${request.style}
- Length: ${request.length}
- Preserve technical terms: ${request.preserve_technical_terms}
${request.target_audience ? `- Target audience: ${request.target_audience}` : ''}

## Primary Rules - The "Every" Style Guide:

### Headlines and Case
- Use title case for headlines and sentence case for everything else

### Company and Team References
- Refer to companies as a singular entity ("it")
- Refer to teams or people within companies as plural ("they")

### Word Usage
- Do not overuse "actually," "very," or "just" - they can almost always be deleted
- Cut adverbs where possible
- Avoid starting sentences with "This" - be specific about what you are referring to
- Avoid starting sentences with "We have" or "We get" - state directly what is happening
- Avoid clichés and jargon
- Use "more than" or "less than"/"fewer than" instead of "over" or "under" for quantities
- Use terms like "earlier," "later," or "previously" instead of "above" or "below"
- Avoid slashes (e.g., and/or) - use hyphens or rephrase if necessary
- Avoid emojis within the text

### Voice
- Use active voice whenever possible

### Numbers, Percentages, and Symbols
- Spell out numbers one through nine; use numerals for 10 and greater
- Spell out any number that begins a sentence, unless it is a year
- Numbers over three digits take a comma (e.g., 1,000)
- Percentages always use numerals, and spell out the word "percent" (e.g., 7 percent)
- Use a dollar sign instead of writing out "dollars" (e.g., $1 billion)
- Write out "times" when referring to power (e.g., two times faster), but you can use "10x" for common tropes

### Punctuation
- Use the Oxford comma (x, y, and z)
- Use a comma to separate two independent clauses. Do not use a comma to separate dependent clauses
- Use an em dash (—) without spaces on either side to set off a parenthetical statement. Generally avoid em dashes
- Do not use a space after an ellipsis...like this
- Place periods and commas inside quotation marks
- Punctuation goes outside parentheses, unless the parenthetical text is a full sentence
- Use a colon to introduce an independent clause with a capital letter. Use a colon to introduce a dependent clause or list with a lowercase letter

### Hyphenation
- Use hyphens in compound adjectives, except for adverbs ending in "-ly" (e.g., a well-regarded author vs. a highly regarded author)

### Formatting and Emphasis
- Use italics for emphasis. Never use bold or underline
- Italicize titles of books, newspapers, periodicals, movies, TV shows, and video games
- Do not italicize "the" before newspaper names or "magazine" after magazine names

### Quotes
- Use double quotation marks (" ") for quotes and single quotation marks (' ') for quotes within quotes
- If the text preceding a quote introduces it (e.g., "She said,"), use a comma
- If the text flows directly into the quote, do not use a comma
- Capitalize the first letter of a quote if it's a complete sentence

### People and Titles
- Do not capitalize job titles (e.g., chief executive officer)
- Identify people by their full name on first mention and last name thereafter
- Identify people by company and/or title (e.g., Stripe's Patrick McKenzie)

### Hyperlinks
- When linking to a source, hyperlink a phrase of two to four words

## Style-Specific Guidelines:
${styleInstructions[request.style]}

## Length Guidelines:
${lengthInstructions[request.length]}

## Additional Humanization Goals:
1. Make the text sound natural and human-like
2. Vary sentence structure and length
3. Add appropriate transitions and connective phrases
4. Include subtle personality and warmth
5. Maintain factual accuracy
${request.preserve_technical_terms ? '6. Keep technical terms unchanged but explain them naturally if needed' : ''}

Please humanize the text according to all guidelines above. Provide:
- original_text: The original input text
- humanized_text: Your humanized version following the "Every" style guide
- style_applied: The style that was applied (${request.style})
- length_change: The length change applied (${request.length})  
- confidence_score: Your confidence in the humanization (0-1 scale)
- changes_made: List of specific changes you made, noting which "Every" style guide rules were applied`
  }

  /**
   * Call Gemini API directly (primary provider)
   */
  private static async callGemini(prompt: string, env: Env): Promise<HumanizedText> {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${env.GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2000,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              original_text: { type: "string" },
              humanized_text: { type: "string" },
              style_applied: { type: "string" },
              length_change: { type: "string" },
              confidence_score: { type: "number" },
              changes_made: {
                type: "array",
                items: { type: "string" }
              }
            },
            required: ["original_text", "humanized_text", "style_applied", "length_change", "confidence_score", "changes_made"]
          }
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.candidates[0]?.content?.parts[0]?.text

    if (!content) {
      throw new Error('No content returned from Gemini API')
    }

    try {
      return JSON.parse(content)
    } catch (e) {
      console.error('Gemini response content:', content)
      throw new Error('Invalid JSON response from Gemini API')
    }
  }

  /**
   * Call OpenAI API directly (fallback)
   */
  private static async callOpenAI(prompt: string, env: Env): Promise<HumanizedText> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.3,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "humanized_text",
            strict: true,
            schema: {
              type: "object",
              properties: {
                original_text: { type: "string" },
                humanized_text: { type: "string" },
                style_applied: { type: "string" },
                length_change: { type: "string" },
                confidence_score: { type: "number" },
                changes_made: {
                  type: "array",
                  items: { type: "string" }
                }
              },
              required: ["original_text", "humanized_text", "style_applied", "length_change", "confidence_score", "changes_made"],
              additionalProperties: false
            }
          }
        }
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('No content returned from OpenAI API')
    }

    try {
      return JSON.parse(content)
    } catch (e) {
      throw new Error('Invalid JSON response from OpenAI API')
    }
  }

  /**
   * Call Anthropic API directly (secondary fallback)
   */
  private static async callAnthropic(prompt: string, env: Env): Promise<HumanizedText> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.ANTHROPIC_API_KEY}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        temperature: 0.3,
        messages: [
          {
            role: 'user',
            content: `${prompt}

You must respond with valid JSON only, no other text. Use this exact schema:
{
  "original_text": "string",
  "humanized_text": "string", 
  "style_applied": "string",
  "length_change": "string",
  "confidence_score": number,
  "changes_made": ["string"]
}`
          }
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.content[0]?.text

    if (!content) {
      throw new Error('No content returned from Anthropic API')
    }

    try {
      return JSON.parse(content)
    } catch (e) {
      throw new Error('Invalid JSON response from Anthropic API')
    }
  }

  /**
   * Humanize text using primary provider with fallback
   */
  static async humanizeText(request: HumanizeRequestInput, env: Env): Promise<HumanizedText> {
    const humanizationRequest: HumanizationRequest = {
      text: request.text,
      style: request.style,
      length: request.length,
      preserve_technical_terms: request.preserve_technical_terms,
      target_audience: request.target_audience || null,
    }

    const prompt = this.generatePrompt(humanizationRequest)

    // Try Gemini first
    try {
      return await this.callGemini(prompt, env)
    } catch (error) {
      console.warn('Gemini failed, trying OpenAI fallback:', error)
      
      // Fallback to OpenAI
      try {
        return await this.callOpenAI(prompt, env)
      } catch (error2) {
        console.warn('OpenAI failed, trying Anthropic fallback:', error2)
        
        // Final fallback to Anthropic
        return await this.callAnthropic(prompt, env)
      }
    }
  }

  /**
   * Quick humanization for shorter texts
   */
  static async quickHumanize(request: QuickHumanizeRequestInput, env: Env): Promise<string> {
    const simplePrompt = `Quickly humanize this text to sound more natural and engaging:

Text: ${request.text}
Style: ${request.style}

Make it sound human while preserving the meaning. Return only the humanized text, no JSON.`

    try {
      // Use Gemini for quick requests
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${env.GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: simplePrompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1000,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`)
      }

      const data = await response.json()
      return data.candidates[0]?.content?.parts[0]?.text || 'Humanization failed'
    } catch (error) {
      console.error('Quick humanization failed:', error)
      throw new Error('Failed to humanize text')
    }
  }

  /**
   * Stream humanize text using real streaming APIs
   */
  static async* humanizeTextStream(request: HumanizeRequestInput, env: Env): AsyncGenerator<Partial<StreamingHumanizedText>, void, unknown> {
    const humanizationRequest: HumanizationRequest = {
      text: request.text,
      style: request.style,
      length: request.length,
      preserve_technical_terms: request.preserve_technical_terms,
      target_audience: request.target_audience || null,
    }

    const prompt = this.generatePrompt(humanizationRequest)

    // Try Gemini streaming first
    try {
      yield* this.streamGemini(prompt, env, humanizationRequest)
      return
    } catch (error) {
      console.warn('Gemini streaming failed, trying OpenAI fallback:', error)
      
      // Fallback to OpenAI streaming
      try {
        yield* this.streamOpenAI(prompt, env, humanizationRequest)
        return
      } catch (error2) {
        console.warn('OpenAI streaming failed, trying Anthropic fallback:', error2)
        
        // Final fallback to Anthropic streaming
        yield* this.streamAnthropic(prompt, env, humanizationRequest)
      }
    }
  }

  /**
   * Stream from Gemini API - simplified streaming without JSON schema
   */
  private static async* streamGemini(prompt: string, env: Env, request: HumanizationRequest): AsyncGenerator<Partial<StreamingHumanizedText>, void, unknown> {
    // Use simple text generation for streaming (no JSON schema)
    const streamPrompt = `Humanize this text with ${request.style} style: "${request.text}"

Please rewrite it to sound more natural and human-like. Just return the humanized text directly, no JSON.`

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:streamGenerateContent?alt=sse&key=${env.GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: streamPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2000,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini streaming API error: ${response.status} ${response.statusText}`)
    }

    if (!response.body) {
      throw new Error('No response body from Gemini streaming API')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let accumulatedText = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim()
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              const content = parsed.candidates?.[0]?.content?.parts?.[0]?.text
              
              if (content) {
                accumulatedText += content
                
                // For simple text streaming, yield the accumulated text directly
                yield {
                  original_text: request.text,
                  humanized_text: accumulatedText.trim(),
                  style_applied: request.style,
                  length_change: request.length,
                  confidence_score: 0.8,
                  changes_made: ["Streamlined for real-time generation"],
                }
              }
            } catch (e) {
              console.warn('Failed to parse Gemini streaming chunk:', e)
            }
          }
        }
      }
    } finally {
      reader.releaseLock()
    }
  }

  /**
   * Stream from OpenAI API
   */
  private static async* streamOpenAI(prompt: string, env: Env, request: HumanizationRequest): AsyncGenerator<Partial<StreamingHumanizedText>, void, unknown> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.3,
        stream: true,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "humanized_text",
            strict: true,
            schema: {
              type: "object",
              properties: {
                original_text: { type: "string" },
                humanized_text: { type: "string" },
                style_applied: { type: "string" },
                length_change: { type: "string" },
                confidence_score: { type: "number" },
                changes_made: {
                  type: "array",
                  items: { type: "string" }
                }
              },
              required: ["original_text", "humanized_text", "style_applied", "length_change", "confidence_score", "changes_made"],
              additionalProperties: false
            }
          }
        }
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI streaming API error: ${response.status} ${response.statusText}`)
    }

    if (!response.body) {
      throw new Error('No response body from OpenAI streaming API')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let accumulatedContent = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim()
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices?.[0]?.delta?.content
              
              if (content) {
                accumulatedContent += content
                
                // Try to parse as complete JSON and extract humanized_text
                try {
                  const result = JSON.parse(accumulatedContent)
                  if (result.humanized_text) {
                    yield {
                      original_text: request.text,
                      humanized_text: result.humanized_text,
                      style_applied: request.style,
                      length_change: request.length,
                      confidence_score: result.confidence_score || 0.8,
                      changes_made: result.changes_made || [],
                    }
                  }
                } catch {
                  // JSON not complete yet, try to extract partial humanized_text
                  const humanizedMatch = accumulatedContent.match(/"humanized_text":\s*"([^"]*(?:\\.[^"]*)*?)"/);
                  if (humanizedMatch) {
                    const extractedText = humanizedMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
                    if (extractedText.length > 5) { // Only yield if we have meaningful content
                      yield {
                        original_text: request.text,
                        humanized_text: extractedText,
                        style_applied: request.style,
                      }
                    }
                  }
                }
              }
            } catch (e) {
              console.warn('Failed to parse OpenAI streaming chunk:', e)
            }
          }
        }
      }
    } finally {
      reader.releaseLock()
    }
  }

  /**
   * Stream from Anthropic API
   */
  private static async* streamAnthropic(prompt: string, env: Env, request: HumanizationRequest): AsyncGenerator<Partial<StreamingHumanizedText>, void, unknown> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.ANTHROPIC_API_KEY}`,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        temperature: 0.3,
        stream: true,
        messages: [
          {
            role: 'user',
            content: `${prompt}

You must respond with valid JSON only, no other text. Use this exact schema:
{
  "original_text": "string",
  "humanized_text": "string", 
  "style_applied": "string",
  "length_change": "string",
  "confidence_score": number,
  "changes_made": ["string"]
}`
          }
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Anthropic streaming API error: ${response.status} ${response.statusText}`)
    }

    if (!response.body) {
      throw new Error('No response body from Anthropic streaming API')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let accumulatedContent = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim()
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              const content = parsed.delta?.text
              
              if (content) {
                accumulatedContent += content
                
                // Try to parse as complete JSON and extract humanized_text
                try {
                  const result = JSON.parse(accumulatedContent)
                  if (result.humanized_text) {
                    yield {
                      original_text: request.text,
                      humanized_text: result.humanized_text,
                      style_applied: request.style,
                      length_change: request.length,
                      confidence_score: result.confidence_score || 0.8,
                      changes_made: result.changes_made || [],
                    }
                  }
                } catch {
                  // JSON not complete yet, try to extract partial humanized_text
                  const humanizedMatch = accumulatedContent.match(/"humanized_text":\s*"([^"]*(?:\\.[^"]*)*?)"/);
                  if (humanizedMatch) {
                    const extractedText = humanizedMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
                    if (extractedText.length > 5) { // Only yield if we have meaningful content
                      yield {
                        original_text: request.text,
                        humanized_text: extractedText,
                        style_applied: request.style,
                      }
                    }
                  }
                }
              }
            } catch (e) {
              console.warn('Failed to parse Anthropic streaming chunk:', e)
            }
          }
        }
      }
    } finally {
      reader.releaseLock()
    }
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