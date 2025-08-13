import React, { useState, useCallback, useRef } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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

  return (
    <div className="min-h-screen bg-background">
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
}