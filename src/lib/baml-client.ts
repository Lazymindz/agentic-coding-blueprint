// BAML Client Integration for React

import { b } from '../../baml_client/baml_client';
import type { 
  HumanizationRequest, 
  HumanizedText, 
  TextStyle, 
  TextLength 
} from '../../baml_client/baml_client/types';

export { TextStyle, TextLength };
export type { HumanizationRequest, HumanizedText };

/**
 * Humanize text using BAML with full configuration options
 */
export async function humanizeText(request: HumanizationRequest): Promise<HumanizedText> {
  try {
    return await b.HumanizeText(request);
  } catch (error) {
    console.error('Error humanizing text:', error);
    throw new Error(`Failed to humanize text: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Quick text humanization with minimal configuration
 */
export async function quickHumanize(
  text: string, 
  style: TextStyle = TextStyle.CONVERSATIONAL
): Promise<string> {
  try {
    return await b.QuickHumanize(text, style);
  } catch (error) {
    console.error('Error in quick humanize:', error);
    throw new Error(`Failed to quickly humanize text: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Humanize text with fallback support for better reliability
 */
export async function humanizeTextWithFallback(request: HumanizationRequest): Promise<HumanizedText> {
  try {
    return await b.HumanizeTextWithFallback(request);
  } catch (error) {
    console.error('Error humanizing text with fallback:', error);
    throw new Error(`Failed to humanize text with fallback: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Analyze text to understand its characteristics
 */
export async function analyzeText(text: string): Promise<Record<string, string>> {
  try {
    return await b.AnalyzeText(text);
  } catch (error) {
    console.error('Error analyzing text:', error);
    throw new Error(`Failed to analyze text: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validate the quality of humanization
 */
export async function validateHumanization(
  original: string, 
  humanized: string
): Promise<Record<string, string>> {
  try {
    return await b.ValidateHumanization(original, humanized);
  } catch (error) {
    console.error('Error validating humanization:', error);
    throw new Error(`Failed to validate humanization: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Helper function to create a basic humanization request
 */
export function createHumanizationRequest(
  text: string,
  options: {
    style?: TextStyle;
    length?: TextLength;
    preserveTechnicalTerms?: boolean;
    targetAudience?: string;
  } = {}
): HumanizationRequest {
  return {
    text,
    style: options.style ?? TextStyle.CONVERSATIONAL,
    length: options.length ?? TextLength.PRESERVE,
    preserve_technical_terms: options.preserveTechnicalTerms ?? false,
    target_audience: options.targetAudience ?? null,
  };
}