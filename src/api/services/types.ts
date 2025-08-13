// Workers-compatible types that match BAML schema but work in Cloudflare Workers

export enum TextStyle {
  CASUAL = "CASUAL",
  PROFESSIONAL = "PROFESSIONAL", 
  ACADEMIC = "ACADEMIC",
  CONVERSATIONAL = "CONVERSATIONAL",
  TECHNICAL = "TECHNICAL",
  CREATIVE = "CREATIVE",
}

export enum TextLength {
  PRESERVE = "PRESERVE",
  EXPAND = "EXPAND",
  CONDENSE = "CONDENSE",
}

export interface HumanizationRequest {
  text: string
  style: TextStyle
  length: TextLength
  preserve_technical_terms: boolean
  target_audience?: string | null
}

export interface HumanizedText {
  original_text: string
  humanized_text: string
  style_applied: TextStyle
  length_change: TextLength
  confidence_score: number
  changes_made: string[]
}

export interface StreamingHumanizedText {
  original_text: string
  humanized_text: string
  style_applied: TextStyle
  length_change: TextLength
  confidence_score: number
  changes_made: string[]
}