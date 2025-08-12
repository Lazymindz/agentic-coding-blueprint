# BAML Foundation Setup - Complete Implementation Guide

## Overview

This project now has a complete BAML (Boundary AI Markup Language) foundation setup for building AI-powered tools like text humanizers. BAML provides type-safe, structured interactions with LLMs through a domain-specific language that compiles to TypeScript.

## Project Structure

```
project/
├── baml_src/              # BAML source files
│   ├── generators.baml    # TypeScript generation config
│   ├── clients.baml       # LLM client configurations
│   ├── types.baml         # Type definitions
│   ├── text_humanizer.baml # Main humanization functions
│   ├── utils.baml         # Utility functions
│   ├── config.baml        # Tests and retry policies
│   └── README.md          # BAML documentation
├── baml_client/           # Auto-generated TypeScript client
│   └── baml_client/       # Generated types and functions
├── src/lib/
│   └── baml-client.ts     # React integration wrapper
├── .env.example           # Environment variables template
├── .env                   # Environment variables (not committed)
├── baml.yaml             # Project configuration
└── package.json          # Updated with BAML scripts
```

## Dependencies Installed

- **@boundaryml/baml**: Runtime library for BAML (v0.204.0)
- Uses npx for CLI commands to avoid global installation issues

## Configuration Files

### 1. LLM Clients (`baml_src/clients.baml`)

Configured three LLM clients:
- **OpenAI**: Primary client using GPT-4o
- **Claude**: Anthropic's Claude 3.5 Sonnet
- **OpenAIFallback**: GPT-4o-mini for fallback scenarios

### 2. Type Definitions (`baml_src/types.baml`)

Core types for text humanization:
- `TextStyle`: CASUAL, PROFESSIONAL, ACADEMIC, CONVERSATIONAL, TECHNICAL, CREATIVE
- `TextLength`: PRESERVE, EXPAND, CONDENSE  
- `HumanizationRequest`: Input structure with text, style, and options
- `HumanizedText`: Output with original/humanized text and metadata
- `ErrorResponse`: Structured error handling

### 3. Functions (`baml_src/text_humanizer.baml`)

Three main functions:
- **HumanizeText**: Full-featured humanization with all options
- **HumanizeTextWithFallback**: Same as above but with automatic fallbacks
- **QuickHumanize**: Simplified function for basic use cases

### 4. Utilities (`baml_src/utils.baml`)

Helper functions:
- **AnalyzeText**: Analyze text characteristics and AI-generation likelihood
- **ValidateHumanization**: Compare original vs humanized text quality
- **HandleError**: Structured error handling with suggestions

## Environment Variables

Required API keys in `.env`:
```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here

# Optional for monitoring
BOUNDARY_PROJECT_ID=your-boundary-project-id  
BOUNDARY_SECRET=your-boundary-secret
```

## Package.json Scripts

Added BAML-specific scripts:
- `baml:generate`: Generate TypeScript client from BAML files
- `baml:validate`: Validate BAML syntax and configuration
- `baml:check`: Alias for validation
- `prebuild`: Auto-generates client before builds

## Usage in React/TypeScript

### Basic Usage

```typescript
import { humanizeText, TextStyle, TextLength } from '@/lib/baml-client';

const result = await humanizeText({
  text: "Your text here",
  style: TextStyle.CONVERSATIONAL,
  length: TextLength.PRESERVE,
  preserve_technical_terms: false,
  target_audience: "general readers"
});

console.log(result.humanized_text);
```

### Quick Usage

```typescript
import { quickHumanize, TextStyle } from '@/lib/baml-client';

const humanized = await quickHumanize(
  "Your text here", 
  TextStyle.CASUAL
);
```

### Advanced Usage with Analysis

```typescript
import { 
  analyzeText, 
  humanizeTextWithFallback,
  validateHumanization 
} from '@/lib/baml-client';

// Analyze the original text
const analysis = await analyzeText(originalText);

// Humanize with fallback support
const result = await humanizeTextWithFallback(request);

// Validate the result
const validation = await validateHumanization(
  originalText, 
  result.humanized_text
);
```

## Development Workflow

1. **Modify BAML files** in `baml_src/` directory
2. **Generate client**: `npm run baml:generate`
3. **Use functions** in your React components via `src/lib/baml-client.ts`
4. **Test** using built-in BAML tests: `npm run baml:validate`

## Key Features Implemented

### Type Safety
- Full TypeScript integration with auto-generated types
- Compile-time checking for all LLM interactions
- IntelliSense support for all BAML functions

### Error Handling
- Structured error responses with suggestions
- Automatic retry policies with exponential backoff
- Fallback client support for high availability

### Testing & Validation  
- Built-in test configurations for different scenarios
- Text analysis and humanization validation functions
- Quality scoring and improvement suggestions

### Production Readiness
- Environment variable management
- Gitignore configuration for generated files
- Build integration with automatic client generation
- Multiple LLM provider support with fallbacks

## Next Steps

1. **Add API Keys**: Copy `.env.example` to `.env` and add your API keys
2. **Test Functions**: Run `npm run baml:generate` to ensure everything works
3. **Integrate**: Import functions from `@/lib/baml-client` in your React components
4. **Extend**: Add more BAML functions in `baml_src/` as needed

## Best Practices Implemented

- **Separation of Concerns**: BAML definitions separated from application code
- **Type Safety**: All LLM interactions are fully typed
- **Configuration Management**: Environment-specific settings
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Testing**: Built-in validation and testing capabilities
- **Documentation**: Comprehensive documentation and examples
- **Version Control**: Proper gitignore for generated files

This setup provides a solid foundation for building AI-powered tools with professional-grade reliability, type safety, and developer experience.