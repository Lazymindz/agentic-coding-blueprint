// BAML Configuration and Settings

// Rate limiting and retry configuration
retry_policy DefaultRetry {
  max_retries 3
  strategy {
    type exponential_backoff
  }
}

// Test configuration for different scenarios
test TestHumanizeBasic {
  functions [HumanizeText]
  args {
    request {
      text "This is a test sentence that needs to be humanized."
      style CASUAL
      length PRESERVE
      preserve_technical_terms false
    }
  }
}

test TestHumanizeTechnical {
  functions [HumanizeText]
  args {
    request {
      text "The API endpoint returns a JSON response with structured data containing user authentication tokens."
      style TECHNICAL
      length EXPAND
      preserve_technical_terms true
      target_audience "software developers"
    }
  }
}

test TestQuickHumanize {
  functions [QuickHumanize]
  args {
    text "This text requires humanization."
    style CONVERSATIONAL
  }
}