// Utility functions for text processing

function AnalyzeText(text: string) -> map<string, string> {
  client OpenAI
  prompt #"
    Analyze the following text and provide insights:

    Text: {{ text }}

    Provide analysis in the following format:
    {
      "tone": "description of tone",
      "style": "writing style detected", 
      "complexity": "simple/medium/complex",
      "audience": "likely target audience",
      "ai_generated_likelihood": "low/medium/high",
      "improvement_areas": "areas that could be improved"
    }

    Return valid JSON only.
  "#
}

function ValidateHumanization(original: string, humanized: string) -> map<string, string> {
  client Claude
  prompt #"
    Compare the original and humanized text to validate quality:

    Original: {{ original }}
    Humanized: {{ humanized }}

    Evaluate and return JSON:
    {
      "meaning_preserved": "true/false",
      "naturalness_score": "1-10",
      "engagement_score": "1-10", 
      "readability_improved": "true/false",
      "issues": "any concerns or issues",
      "suggestions": "suggestions for improvement"
    }
  "#
}

// Error handling function
function HandleError(error_message: string, context: string) -> ErrorResponse {
  client OpenAIFallback
  prompt #"
    An error occurred in the text humanization process:
    Error: {{ error_message }}
    Context: {{ context }}

    Provide a helpful error response with suggestions for the user.
    Return the response in ErrorResponse format.
  "#
}