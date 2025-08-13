client<llm> OpenAI {
  provider openai
  options {
    model gpt-4o
    api_key env.OPENAI_API_KEY
    max_tokens 2000
    temperature 0.3
  }
}

client<llm> Claude {
  provider anthropic
  options {
    model claude-3-5-sonnet-20241022
    api_key env.ANTHROPIC_API_KEY
    max_tokens 2000
    temperature 0.3
  }
}

client<llm> Gemini {
  provider google-ai
  options {
    model gemini-2.0-flash-lite
    api_key env.GOOGLE_API_KEY
  }
}

// Fallback configuration for high availability
client<llm> OpenAIFallback {
  provider openai
  options {
    model gpt-4o-mini
    api_key env.OPENAI_API_KEY
    max_tokens 2000
    temperature 0.3
  }
}