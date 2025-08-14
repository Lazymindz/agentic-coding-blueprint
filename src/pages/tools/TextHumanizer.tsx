import React, { useState, useCallback, useRef } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Wand2, AlertCircle, Loader2, RefreshCw, Settings, Zap, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HUMANIZATION_STYLES = [
  { value: 'CONVERSATIONAL', label: 'Conversational', description: 'Direct and engaging' },
  { value: 'CASUAL', label: 'Casual', description: 'Relaxed and informal' },
  { value: 'PROFESSIONAL', label: 'Professional', description: 'Business-appropriate' },
  { value: 'ACADEMIC', label: 'Academic', description: 'Scholarly and formal' },
  { value: 'TECHNICAL', label: 'Technical', description: 'Precise and informative' },
  { value: 'CREATIVE', label: 'Creative', description: 'Imaginative and expressive' },
];

const LENGTH_OPTIONS = [
  { value: 'PRESERVE', label: 'Preserve', description: 'Keep similar length' },
  { value: 'EXPAND', label: 'Expand', description: 'Add detail and examples' },
  { value: 'CONDENSE', label: 'Condense', description: 'Make more concise' },
];

const EXAMPLE_TEXTS = [
  "The system processes data through multiple algorithmic layers to optimize...",
  "Implementation of advanced caching mechanisms results in substantial...",
  "Machine learning models require extensive data preprocessing and feature..."
];

const FULL_EXAMPLE_TEXTS = [
  "The system processes data through multiple algorithmic layers to optimize performance metrics and deliver enhanced user experience outcomes.",
  "Implementation of advanced caching mechanisms results in substantial performance improvements across distributed systems.",
  "Machine learning models require extensive data preprocessing and feature engineering to achieve optimal predictive accuracy."
];

const HUMANIZATION_PROMPT = `<purpose>
    You are the "Every Style Guide Editor." Your sole purpose is to act as an expert writing editor who rigorously applies the "Every" style guide to any text provided. You will go through the text line by line, identify every deviation from the guide, explain the issue clearly, and suggest the correct alternative.
</purpose>

<instructions>
    <instruction>If the user-text section below is empty or only contains the placeholder \`[[user-text]]\`, ask the user to provide the text they would like to have edited before proceeding.</instruction>
    <instruction>First, ask about the user's specific goals for the piece and the intended audience, if it's not obvious.</instruction>
    <instruction>Second, briefly outline the editorial guidance you will provide, confirming that you will be following the "Every" style guide.</instruction>
    <instruction>Third, deliver categorized, line-by-line feedback. Start with overall feedback, then a comprehensive list of edits (quoting the problem, showing the correction, and explaining the specific rule), and finally, any structural or formatting guidance.</instruction>
    <instruction>Fourth, after providing detailed feedback, ask the user if they have any questions or wish to discuss the edits further.</instruction>
    <instruction>Finally, offer to rewrite the entire text, incorporating all recommended changes to produce a clean, fully-edited final version.</instruction>
    <instruction>Adhere to the "Every" Style Guide in all your analysis and corrections.</instruction>
</instructions>

<style-guide>
    <rule name="Headlines and Case">Use title case for headlines and sentence case for everything else.</rule>
    <rule name="Company and Team References">Refer to companies as a singular entity ("it") and teams or people within companies as plural ("they").</rule>
    <rule name="Word Usage">
        <sub-rule>Do not overuse "actually," "very," or "just."</sub-rule>
        <sub-rule>Cut adverbs where possible.</sub-rule>
        <sub-rule>Avoid starting sentences with "This." Be specific.</sub-rule>
        <sub-rule>Avoid starting sentences with "We have" or "We get." State directly what is happening.</sub-rule>
        <sub-rule>Avoid clichés and jargon.</sub-rule>
        <sub-rule>Use "more than" or "fewer than" instead of "over" or "under" for quantities.</sub-rule>
        <sub-rule>Use terms like "earlier," "later," or "previously" instead of "above" or "below."</sub-rule>
        <sub-rule>Avoid slashes (e.g., and/or); use hyphens or rephrase.</sub-rule>
    </rule>
    <rule name="Voice">Use active voice whenever possible.</rule>
    <rule name="Numbers, Percentages, and Symbols">
        <sub-rule>Spell out numbers one through nine; use numerals for 10 and greater.</sub-rule>
        <sub-rule>Spell out any number that begins a sentence, unless it is a year.</sub-rule>
        <sub-rule>Numbers over three digits take a comma (e.g., 1,000).</sub-rule>
        <sub-rule>Percentages always use numerals, and spell out the word "percent" (e.g., 7 percent).</sub-rule>
        <sub-rule>Use a dollar sign instead of writing out "dollars" (e.g., $1 billion).</sub-rule>
        <sub-rule>Write out "times" when referring to power (e.g., two times faster), but you can use "10x" when referring to the common trope.</sub-rule>
    </rule>
    <rule name="Punctuation">
        <sub-rule>Use the Oxford comma (x, y, and z).</sub-rule>
        <sub-rule>Use a comma to separate two independent clauses. Do not use a comma to separate dependent clauses.</sub-rule>
        <sub-rule>Use an em dash (—) without spaces on either side to set off a parenthetical statement. Generally avoid em dashes.</sub-rule>
        <sub-rule>Do not use a space after an ellipsis...like this.</sub-rule>
        <sub-rule>Place periods and commas inside quotation marks.</sub-rule>
        <sub-rule>Punctuation goes outside parentheses, unless the parenthetical text is a full sentence.</sub-rule>
        <sub-rule>Use a colon to introduce an independent clause with a capital letter. Use a colon to introduce a dependent clause or list with a lowercase letter.</sub-rule>
    </rule>
    <rule name="Hyphenation">Use hyphens in compound adjectives, except for adverbs ending in "-ly" (e.g., a well-regarded author vs. a highly regarded author).</rule>
    <rule name="Formatting and Emphasis">
        <sub-rule>Use italics for emphasis. Never use bold or underline.</sub-rule>
        <sub-rule>Italicize titles of books, newspapers, periodicals, movies, TV shows, and video games. Do not italicize "the" before *New York Times* or "magazine" after *New York*.</sub-rule>
        <sub-rule>Image captions must have italicized credits: *Source: X/Name* or *Source: Website name*.</sub-rule>
    </rule>
    <rule name="Quotes">
        <sub-rule>Use double quotation marks (" ") for quotes and single quotation marks (' ') for quotes within quotes.</sub-rule>
        <sub-rule>If the text preceding a quote introduces it (e.g., "She said,"), use a comma. If the text flows directly into the quote, do not use a comma.</sub-rule>
        <sub-rule>Capitalize the first letter of a quote if it's a complete sentence.</sub-rule>
    </rule>
    <rule name="People and Titles">
        <sub-rule>Do not capitalize job titles (e.g., chief executive officer).</sub-rule>
        <sub-rule>Identify people by their full name on first mention and last name thereafter.</sub-rule>
        <sub-rule>Identify people by company and/or title (e.g., Stripe's Patrick McKenzie).</sub-rule>
    </rule>
    <rule name="Hyperlinks">When linking to a source, hyperlink a phrase of two to four words.</rule>
</style-guide>

<examples>
    <example>
        <user-text>
            This is a very important article about our company. We have over 1000 users who just love our product. The CEO, John Smith, said "our product is 2x better". We should also check out the article in the New York Times.
        </user-text>
        <editor-response>
            Before I begin, could you tell me a bit about your goals for this piece and who the intended audience is?

            ---
            *(Assuming user provides context)*
            ---

            Thank you. I will now review your text line by line, strictly following the "Every" style guide. My feedback will include an overall summary, a detailed list of edits, and then I will offer to generate a clean final version for you.

            **Overall Feedback**
            The main patterns of style guide violations I found were starting sentences with "This" or "We have," using adverbs that can be cut, incorrect number formatting, and improper punctuation around quotes.

            **Comprehensive List of Edits**
            1.  **Problem:** \`This is a very important article...\`
                **Correction:** \`The article is important...\`
                **Rule:** Avoid starting sentences with "This" and cut unnecessary adverbs like "very."

            2.  **Problem:** \`We have over 1000 users...\`
                **Correction:** \`More than 1,000 users...\`
                **Rule:** Use "more than" instead of "over" for quantities, use numerals for numbers 10 and greater, add a comma for numbers over three digits, and avoid starting sentences with "We have."

            3.  **Problem:** \`...who just love our product.\`
                **Correction:** \`...who love our product.\`
                **Rule:** Do not overuse "just." It can almost always be deleted.

            4.  **Problem:** \`The CEO, John Smith...\`
                **Correction:** \`The chief executive officer, John Smith...\`
                **Rule:** Do not capitalize job titles.

            5.  **Problem:** \`...said "our product is 2x better".\`
                **Correction:** \`...said, "Our product is two times better."\`
                **Rule:** Use a comma to introduce a quote after a verb like "said." Capitalize the first letter of a quote if it's a complete sentence. Spell out "times" when referring to power. Place periods inside quotation marks.

            6.  **Problem:** \`...the New York Times.\`
                **Correction:** \`the *New York Times*.\`
                **Rule:** Italicize titles of newspapers, but do not italicize "the" before the name.

            **Structural and Formatting Guidance**
            This text is a good start. For a professional web article, ensure each paragraph focuses on a single idea. You could expand on the user numbers or the CEO's statement to provide more value to the reader.

            Do you have any questions about these edits, or would you like to discuss any of them further? If you're ready, I can rewrite the full text with all these changes applied.
        </editor-response>
    </example>
</examples>

<user-text>
    [[user-text]]
</user-text>`;

export default function TextHumanizer() {
  console.log('🎯 TextHumanizer component loaded!');
  
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Debug log
  console.log('Input text:', inputText, 'Output text:', outputText);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  
  // Configuration state
  const [style, setStyle] = useState('CONVERSATIONAL');
  const [length, setLength] = useState('PRESERVE');
  const [preserveTerms, setPreserveTerms] = useState(true);
  const [targetAudience, setTargetAudience] = useState('');
  
  const { toast } = useToast();
  const abortControllerRef = useRef<AbortController | null>(null);

  const characterCount = inputText.length;
  const estimatedTokens = Math.ceil(characterCount / 4);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the text manually",
        variant: "destructive",
      });
    }
  }, [toast]);

  const loadExample = (example: string) => {
    setInputText(example);
    setError(null);
    setOutputText('');
    setResult(null);
  };

  const stopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setIsStreaming(false);
  };

  const humanizeTextStream = async () => {
    console.log('🚀 HUMANIZE FUNCTION CALLED!', { inputText: inputText.substring(0, 50) });
    
    if (!inputText.trim()) {
      setError('Please enter some text to humanize');
      return;
    }

    console.log('✅ Validation passed, starting streaming...');
    setIsLoading(true);
    setIsStreaming(true);
    setError(null);
    setResult(null);
    setOutputText('');

    try {
      const response = await fetch('/api/humanize/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText.trim(),
          style,
          length,
          preserve_technical_terms: preserveTerms,
          target_audience: targetAudience || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start streaming');
      }

      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.body) {
        throw new Error('No response stream available');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulatedText = '';
      let currentResult: any = null;
      let chunkCount = 0;

      console.log('🔄 Starting to read stream...');

      while (true) {
        console.log('⏳ Reading next chunk...');
        const { done, value } = await reader.read();
        
        if (done) {
          console.log('✅ Stream done, total chunks:', chunkCount);
          break;
        }

        chunkCount++;
        const chunk = decoder.decode(value, { stream: true });
        console.log(`📦 Chunk ${chunkCount} (${chunk.length} bytes):`, chunk.substring(0, 100));
        buffer += chunk;
        
        // Process complete lines
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        // Track streaming updates
        let updateCount = 0;
        
        for (const line of lines) {
          console.log('Processing line:', line);
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              console.log('Parsed streaming data:', data);
              
              if (data.started) {
                console.log('Stream started:', data.message);
              } else if (data.success && data.partial && data.data) {
                // Update text immediately as it streams
                if (data.data.humanized_text) {
                  updateCount++;
                  accumulatedText = data.data.humanized_text;
                  setOutputText(accumulatedText); // Direct update, no animation delays
                  console.log('Updated output text:', accumulatedText);
                }
                
                // Store the most complete result so far
                if (data.data.confidence_score || data.data.changes_made) {
                  currentResult = { ...currentResult, ...data.data };
                  setResult(currentResult);
                }
              } else if (data.completed) {
                console.log('Streaming completed');
                
                // Ensure final text is set
                if (accumulatedText) {
                  setOutputText(accumulatedText);
                }
                
                setIsLoading(false);
                setIsStreaming(false);
                
                if (accumulatedText) {
                  toast({
                    title: "Success!",
                    description: "Text humanized successfully",
                  });
                }
                
                return;
              } else if (!data.success) {
                throw new Error(data.message || 'Streaming failed');
              }
            } catch (parseError) {
              console.warn('Failed to parse streaming data:', parseError, 'Line:', line);
            }
          }
        }
      }

    } catch (error: any) {
      console.error('Streaming error:', error);
      setError(error.message || 'An unexpected error occurred');
      toast({
        title: "Error",
        description: "Failed to humanize text. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Text Humanizer",
    "description": "Transform AI-generated text into natural, human-like content with advanced humanization techniques",
    "url": "https://aiproof.me/tools/text-humanizer",
    "applicationCategory": "AI Tool",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI Text Humanizer - Make AI Content Sound Human | AIProof.ME"
        description="Transform AI-generated text into natural, human-like content. Free tool with multiple writing styles and advanced humanization techniques."
        keywords="AI text humanizer, humanize AI text, AI content detector, natural writing, AI to human converter, content humanization"
        canonical="https://aiproof.me/tools/text-humanizer"
        ogType="website"
        structuredData={structuredData}
      />
      <Header />
      
      {/* Bauhaus geometric elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-16 h-16 color-accent-red border-4 border-black rotate-12" />
        <div className="absolute top-40 right-16 w-20 h-20 color-accent-blue border-4 border-black -rotate-12" />
        <div className="absolute bottom-32 left-20 w-12 h-12 color-accent-yellow border-4 border-black rotate-45" />
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-black rotate-12" />
      </div>
      
      <main className="container mx-auto px-6 py-8 relative z-10">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            TEXT HUMANIZER
          </h1>
          <p className="text-lg font-mono uppercase max-w-2xl mx-auto">
            TRANSFORM AI-GENERATED TEXT INTO NATURAL, PROFESSIONAL COMMUNICATION
          </p>
          
          {/* Model Info Note */}
          <div className="max-w-4xl mx-auto mt-6">
            <Alert className="border-4 border-black bg-blue-50 shadow-brutal">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-mono text-sm">
                <div className="space-y-2">
                  <div><strong>Powered by Gemini 2.5 Flash Lite</strong> (Fast and Cheap)</div>
                  <div>
                    For better results, copy the prompt below and use it in ChatGPT, Claude, or Gemini.{' '}
                    <button 
                      onClick={() => document.getElementById('prompt-section')?.scrollIntoView({ behavior: 'smooth' })}
                      className="underline hover:no-underline font-black uppercase"
                    >
                      Go to Prompt
                    </button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Main Layout - Left/Right Panels */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Left Panel - Input */}
            <Card className="slide-card border-8 border-black bg-background shadow-brutal">
              <CardHeader className="pb-4">
                <CardTitle className="font-black uppercase tracking-tighter text-xl flex items-center gap-2">
                  <div className="color-accent-blue border-4 border-black p-2">
                    <Wand2 className="w-5 h-5 text-black" />
                  </div>
                  BEFORE (ORIGINAL TEXT)
                </CardTitle>
                <CardDescription className="font-mono uppercase text-xs">
                  ENTER THE TEXT YOU WANT TO HUMANIZE
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Textarea
                    placeholder="Paste your AI-generated or robotic text here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[300px] bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 transition-colors resize-none"
                  />
                  <div className="flex justify-between items-center mt-2 text-sm font-mono">
                    <span>{characterCount} characters • ~{estimatedTokens} tokens</span>
                    {characterCount > 5000 && (
                      <Badge variant="destructive" className="text-xs">
                        Too long (max 5000)
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Quick Examples */}
                <div>
                  <Label className="font-black uppercase text-sm">Quick Examples</Label>
                  <div className="space-y-1 mt-2">
                    {EXAMPLE_TEXTS.map((example, index) => (
                      <button
                        key={index}
                        className="w-full h-auto p-2 text-left justify-start border-4 border-black bg-background hover:shadow-brutal transition-all duration-200 text-xs leading-tight font-mono uppercase"
                        onClick={() => loadExample(FULL_EXAMPLE_TEXTS[index])}
                      >
                        <span className="text-left">{example}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Panel - Output */}
            <Card className="slide-card border-8 border-black bg-background shadow-brutal">
              <CardHeader className="pb-4">
                <CardTitle className="font-black uppercase tracking-tighter text-xl flex items-center gap-2">
                  <div className="color-accent-yellow border-4 border-black p-2">
                    <Zap className="w-5 h-5 text-black" />
                  </div>
                  AFTER (HUMANIZED TEXT)
                </CardTitle>
                <CardDescription className="font-mono uppercase text-xs">
                  YOUR TRANSFORMED, HUMAN-LIKE CONTENT
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert className="mb-4 border-red-500/20 bg-red-500/10">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <AlertDescription className="text-red-300">
                      {error}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={humanizeTextStream}
                        className="ml-3 border-red-500/40 text-red-300 hover:bg-red-500/20"
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Retry
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="relative">
                  <Textarea
                    key={`output-${outputText.length}`}
                    placeholder="Your humanized text will appear here..."
                    value={outputText}
                    className="min-h-[300px] bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 transition-colors resize-none"
                    readOnly
                  />
                  {outputText && (
                    <button
                      onClick={() => copyToClipboard(outputText)}
                      className="absolute bottom-3 right-3 brutal-button-compact bg-accent text-accent-foreground"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      COPY
                    </button>
                  )}
                  
                  {isLoading && !outputText && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                        <p className="text-purple-300 text-sm">Starting humanization...</p>
                      </div>
                    </div>
                  )}
                  
                  {isLoading && outputText && (
                    <div className="absolute bottom-3 left-3">
                      <div className="flex items-center gap-2 bg-secondary border-4 border-black px-3 py-1 shadow-brutal">
                        <div className="w-2 h-2 color-accent-red border border-black animate-pulse"></div>
                        <span className="text-black text-xs font-black uppercase">LIVE</span>
                      </div>
                    </div>
                  )}
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Bottom Section - Options and Button */}
          <div className="grid lg:grid-cols-4 gap-4 items-end">
            {/* Style Selection */}
            <div>
              <Label className="font-black uppercase text-sm">Style</Label>
              <Select value={style} onValueChange={(value: any) => setStyle(value)}>
                <SelectTrigger className="mt-2 bg-background border-4 border-black hover:shadow-brutal transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-4 border-black">
                  {HUMANIZATION_STYLES.map((styleOption) => (
                    <SelectItem key={styleOption.value} value={styleOption.value} className="hover:bg-accent">
                      <div>
                        <div className="font-black uppercase">{styleOption.label}</div>
                        <div className="text-xs font-mono uppercase">{styleOption.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Length Control */}
            <div>
              <Label className="font-black uppercase text-sm">Length</Label>
              <Select value={length} onValueChange={(value: any) => setLength(value)}>
                <SelectTrigger className="mt-2 bg-background border-4 border-black hover:shadow-brutal transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-4 border-black">
                  {LENGTH_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="hover:bg-accent">
                      <div>
                        <div className="font-black uppercase">{option.label}</div>
                        <div className="text-xs font-mono uppercase">{option.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-black uppercase text-sm">Preserve Terms</Label>
                <Switch
                  checked={preserveTerms}
                  onCheckedChange={setPreserveTerms}
                />
              </div>
              <input
                type="text"
                placeholder="TARGET AUDIENCE (OPTIONAL)"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full h-10 px-3 py-2 bg-background border-4 border-black font-mono uppercase placeholder:opacity-50 focus:shadow-brutal focus:outline-none transition-all text-sm"
              />
            </div>

            {/* Action Button */}
            <div className="flex gap-2">
              {isStreaming ? (
                <Button
                  onClick={stopStreaming}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white transition-colors"
                  size="lg"
                >
                  Stop
                </Button>
              ) : (
                <button
                  onClick={() => {
                    console.log('🔥 BUTTON CLICKED!');
                    humanizeTextStream();
                  }}
                  disabled={!inputText.trim() || characterCount > 5000}
                  className="brutal-button bg-accent text-accent-foreground w-full h-10 flex items-center justify-center"
                >
                  HUMANIZE
                </button>
              )}
            </div>
          </div>

          {/* Key Improvements */}
          {result?.changes_made && result.changes_made.length > 0 && outputText && (
            <Card className="slide-card border-8 border-black bg-background shadow-brutal mt-6">
              <CardHeader>
                <CardTitle className="font-black uppercase tracking-tighter text-xl">KEY IMPROVEMENTS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {result.changes_made.slice(0, 4).map((change: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 color-accent-blue border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-black text-xs font-black">✓</span>
                      </div>
                      <span className="font-mono uppercase">{change}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Prompt Section */}
          <Card id="prompt-section" className="slide-card border-8 border-black bg-background shadow-brutal mt-6">
            <CardHeader>
              <CardTitle className="font-black uppercase tracking-tighter text-xl flex items-center gap-2">
                <div className="color-accent-yellow border-4 border-black p-2">
                  <Settings className="w-5 h-5 text-black" />
                </div>
                PROMPT
              </CardTitle>
              <CardDescription className="font-mono uppercase text-xs">
                Copy this prompt and use it as-is in ChatGPT, Claude, or Gemini for enhanced text humanization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg border-4 border-black overflow-auto max-h-96 text-sm font-mono whitespace-pre-wrap">
                  {HUMANIZATION_PROMPT}
                </pre>
                <button
                  onClick={() => copyToClipboard(HUMANIZATION_PROMPT)}
                  className="absolute top-4 right-4 brutal-button-compact bg-accent text-accent-foreground"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  COPY PROMPT
                </button>
              </div>
              <Alert className="border-4 border-black bg-green-50 shadow-brutal">
                <ArrowRight className="h-4 w-4" />
                <AlertDescription className="font-mono text-sm">
                  <strong>Pro Tip:</strong> Replace <code>[[user-text]]</code> at the bottom with your text, then paste the entire prompt into ChatGPT, Claude, or Gemini for professional editing guidance.
                </AlertDescription>
              </Alert>
              
              {/* Prompt Credits */}
              <Alert className="border-4 border-black bg-blue-50 shadow-brutal mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-mono text-sm">
                  <div className="space-y-2">
                    <div><strong>Prompt Credits:</strong></div>
                    <div>
                      This XML-based prompt was created by combining insights from:
                    </div>
                    <div className="ml-4 space-y-1">
                      <div>
                        • <a 
                            href="https://gemini.google.com/gem/writing-editor" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="underline hover:no-underline font-black"
                          >
                            Gemini Writing Editor
                          </a>
                      </div>
                      <div>
                        • <a 
                            href="https://x.com/danshipper/status/1940066647936577608" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="underline hover:no-underline font-black"
                          >
                            Dan Shipper's prompt engineering post
                          </a>
                      </div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}