// Text Humanization Functions

function HumanizeText(request: HumanizationRequest) -> HumanizedText {
  client Gemini
  prompt #"
    You are an expert text humanizer. Your task is to take AI-generated or robotic text and make it sound more human, natural, and engaging while preserving the core meaning and information.

    ## Input Text:
    {{ request.text }}

    ## Humanization Requirements:
    - Style: {{ request.style }}
    - Length: {{ request.length }}
    - Preserve technical terms: {{ request.preserve_technical_terms }}
    {% if request.target_audience %}
    - Target audience: {{ request.target_audience }}
    {% endif %}

    ## Instructions:
    1. Make the text sound more natural and human-like
    2. Vary sentence structure and length
    3. Add appropriate transitions and connective phrases
    4. Use active voice when possible
    5. Include subtle personality and warmth
    6. Maintain factual accuracy
    {% if request.preserve_technical_terms %}
    7. Keep technical terms unchanged but explain them naturally if needed
    {% endif %}

    ## Style Guidelines:
    {% if request.style == "CASUAL" %}
    - Use conversational tone, contractions, and informal language
    - Include relatable examples and analogies
    - Make it feel like a friendly conversation
    {% elif request.style == "PROFESSIONAL" %}
    - Maintain professional tone while being approachable
    - Use clear, direct language
    - Include relevant examples and insights
    {% elif request.style == "ACADEMIC" %}
    - Use scholarly tone with precise language
    - Include proper transitions and logical flow
    - Maintain formality while being accessible
    {% elif request.style == "CONVERSATIONAL" %}
    - Write as if speaking directly to the reader
    - Use questions and direct address ("you", "your")
    - Include natural speech patterns and rhythm
    {% elif request.style == "TECHNICAL" %}
    - Maintain technical accuracy while improving readability
    - Add explanations for complex concepts
    - Use clear, logical structure
    {% elif request.style == "CREATIVE" %}
    - Use engaging language and creative expressions
    - Include metaphors, analogies, and vivid descriptions
    - Make it memorable and interesting
    {% endif %}

    ## Length Guidelines:
    {% if request.length == "PRESERVE" %}
    - Keep similar length to original
    {% elif request.length == "EXPAND" %}
    - Add detail, examples, and elaboration (20-50% longer)
    {% elif request.length == "CONDENSE" %}
    - Remove redundancy while keeping key points (20-30% shorter)
    {% endif %}

    Return your response in this EXACT JSON format (no markdown, no extra text):
    {
      "original_text": "{{ request.text }}",
      "humanized_text": "your humanized version here",
      "style_applied": "{{ request.style }}",
      "length_change": "{{ request.length }}",
      "confidence_score": 0.95,
      "changes_made": ["list of specific changes you made"]
    }
  "#
}

function HumanizeTextWithFallback(request: HumanizationRequest) -> HumanizedText {
  client Gemini
  prompt #"
    You are an expert text humanizer. Your task is to take AI-generated or robotic text and make it sound more human, natural, and engaging while preserving the core meaning and information.

    ## Input Text:
    {{ request.text }}

    ## Humanization Requirements:
    - Style: {{ request.style }}
    - Length: {{ request.length }}
    - Preserve technical terms: {{ request.preserve_technical_terms }}
    {% if request.target_audience %}
    - Target audience: {{ request.target_audience }}
    {% endif %}

    ## Instructions:
    1. Make the text sound more natural and human-like
    2. Vary sentence structure and length
    3. Add appropriate transitions and connective phrases
    4. Use active voice when possible
    5. Include subtle personality and warmth
    6. Maintain factual accuracy
    {% if request.preserve_technical_terms %}
    7. Keep technical terms unchanged but explain them naturally if needed
    {% endif %}

    Return your response in this EXACT JSON format (no markdown, no extra text):
    {
      "original_text": "{{ request.text }}",
      "humanized_text": "your humanized version here",
      "style_applied": "{{ request.style }}",
      "length_change": "{{ request.length }}",
      "confidence_score": 0.95,
      "changes_made": ["list of specific changes you made"]
    }
  "#
}

// Quick humanization for shorter texts
function QuickHumanize(text: string, style: TextStyle) -> string {
  client Gemini
  prompt #"
    Quickly humanize this text to sound more natural and engaging:

    Text: {{ text }}
    Style: {{ style }}

    Make it sound human while preserving the meaning. Return only the humanized text, no JSON.
  "#
}

// Streaming humanization function
function HumanizeTextStream(request: HumanizationRequest) -> StreamingHumanizedText {
  client Gemini
  prompt #"
    You are an expert text humanizer. Your task is to take AI-generated or robotic text and make it sound more human, natural, and engaging while preserving the core meaning and information.

    ## Input Text:
    {{ request.text }}

    ## Humanization Requirements:
    - Style: {{ request.style }}
    - Length: {{ request.length }}
    - Preserve technical terms: {{ request.preserve_technical_terms }}
    {% if request.target_audience %}
    - Target audience: {{ request.target_audience }}
    {% endif %}

    ## Instructions:
    1. Make the text sound more natural and human-like
    2. Vary sentence structure and length
    3. Add appropriate transitions and connective phrases
    4. Use active voice when possible
    5. Include subtle personality and warmth
    6. Maintain factual accuracy
    {% if request.preserve_technical_terms %}
    7. Keep technical terms unchanged but explain them naturally if needed
    {% endif %}

    ## Style Guidelines:
    {% if request.style == "CASUAL" %}
    - Use conversational tone, contractions, and informal language
    - Include relatable examples and analogies
    - Make it feel like a friendly conversation
    {% elif request.style == "PROFESSIONAL" %}
    - Maintain professional tone while being approachable
    - Use clear, direct language
    - Include relevant examples and insights
    {% elif request.style == "ACADEMIC" %}
    - Use scholarly tone with precise language
    - Include proper transitions and logical flow
    - Maintain formality while being accessible
    {% elif request.style == "CONVERSATIONAL" %}
    - Write as if speaking directly to the reader
    - Use questions and direct address ("you", "your")
    - Include natural speech patterns and rhythm
    {% elif request.style == "TECHNICAL" %}
    - Maintain technical accuracy while improving readability
    - Add explanations for complex concepts
    - Use clear, logical structure
    {% elif request.style == "CREATIVE" %}
    - Use engaging language and creative expressions
    - Include metaphors, analogies, and vivid descriptions
    - Make it memorable and interesting
    {% endif %}

    ## Length Guidelines:
    {% if request.length == "PRESERVE" %}
    - Keep similar length to original
    {% elif request.length == "EXPAND" %}
    - Add detail, examples, and elaboration (20-50% longer)
    {% elif request.length == "CONDENSE" %}
    - Remove redundancy while keeping key points (20-30% shorter)
    {% endif %}

    Return your response in this EXACT JSON format (no markdown, no extra text):
    {
      "original_text": "{{ request.text }}",
      "humanized_text": "your humanized version here",
      "style_applied": "{{ request.style }}",
      "length_change": "{{ request.length }}",
      "confidence_score": 0.95,
      "changes_made": ["list of specific changes you made"]
    }
  "#
}
