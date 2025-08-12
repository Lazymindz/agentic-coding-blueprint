# BAML Text Humanizer

This directory contains BAML (Boundary AI Markup Language) definitions for the text humanization system.

## File Structure

- `generators.baml` - Configures TypeScript code generation
- `clients.baml` - LLM client configurations (OpenAI, Anthropic)
- `types.baml` - Type definitions for the text humanization system
- `text_humanizer.baml` - Main text humanization functions
- `utils.baml` - Utility functions for text analysis and validation
- `config.baml` - Test configurations and retry policies

## Main Functions

### HumanizeText
Primary function for humanizing text with full configuration options:
- Takes a `HumanizationRequest` with style, length, and audience preferences
- Returns a `HumanizedText` object with the processed text and metadata
- Supports multiple styles: CASUAL, PROFESSIONAL, ACADEMIC, CONVERSATIONAL, TECHNICAL, CREATIVE

### HumanizeTextWithFallback
Same as `HumanizeText` but with automatic fallback to Claude and GPT-4o-mini if the primary model fails.

### QuickHumanize
Simplified function for quick text humanization:
- Takes text string and style enum
- Returns humanized text directly (no metadata)

## Utility Functions

### AnalyzeText
Analyzes text to understand its characteristics and provides insights for humanization.

### ValidateHumanization
Compares original and humanized text to ensure quality and preservation of meaning.

### HandleError
Provides structured error handling with helpful suggestions.

## Usage in TypeScript

After running `npm run baml:generate`, you can use these functions in your React app:

```typescript
import { b } from "../baml_client";
import { TextStyle, TextLength } from "../baml_client/types";

const humanizeText = async (text: string) => {
  const result = await b.HumanizeText({
    text,
    style: TextStyle.CONVERSATIONAL,
    length: TextLength.PRESERVE,
    preserve_technical_terms: false,
    target_audience: "general readers"
  });
  
  return result.humanized_text;
};
```

## Environment Variables Required

Make sure to set these in your `.env` file:
- `OPENAI_API_KEY` - Your OpenAI API key
- `ANTHROPIC_API_KEY` - Your Anthropic API key (optional, for fallback)

## Running Tests

Use the built-in BAML tests to verify your functions:

```bash
npm run baml:validate
```