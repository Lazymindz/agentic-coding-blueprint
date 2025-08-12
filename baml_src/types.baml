// Core data types for text humanization

enum TextStyle {
  CASUAL
  PROFESSIONAL
  ACADEMIC
  CONVERSATIONAL
  TECHNICAL
  CREATIVE
}

enum TextLength {
  PRESERVE // Keep original length
  EXPAND   // Make it longer
  CONDENSE // Make it shorter
}

class HumanizationRequest {
  text string
  style TextStyle
  length TextLength
  preserve_technical_terms bool
  target_audience string?
}

class HumanizedText {
  original_text string
  humanized_text string
  style_applied TextStyle
  length_change TextLength
  confidence_score float
  changes_made string[]
}

class ErrorResponse {
  error_type string
  message string
  suggestions string[]
}