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
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    if (!inputText.trim()) {
      setError('Please enter some text to humanize');
      return;
    }

    setIsLoading(true);
    setIsStreaming(true);
    setError(null);
    setResult(null);
    setOutputText('');

    // Create abort controller for stopping stream
    abortControllerRef.current = new AbortController();

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
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to start streaming');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response stream available');
      }

      let accumulatedText = '';
      let currentResult: any = null;

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.success && data.partial && data.data) {
                // Update streaming text
                if (data.data.humanized_text) {
                  accumulatedText = data.data.humanized_text;
                  setOutputText(accumulatedText);
                }
                
                // Store the most complete result so far
                if (data.data.confidence_score || data.data.changes_made) {
                  currentResult = { ...currentResult, ...data.data };
                  setResult(currentResult);
                }
              } else if (data.completed) {
                // Streaming completed
                break;
              } else if (!data.success) {
                throw new Error(data.message || 'Streaming failed');
              }
            } catch (parseError) {
              console.warn('Failed to parse streaming data:', parseError);
            }
          }
        }
      }

      if (accumulatedText) {
        toast({
          title: "Success!",
          description: "Text humanized successfully",
        });
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        toast({
          title: "Stopped",
          description: "Streaming was stopped",
        });
      } else {
        console.error('Streaming error:', error);
        setError(error.message || 'An unexpected error occurred');
        toast({
          title: "Error",
          description: "Failed to humanize text. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Text Humanizer
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Transform AI-generated text into natural, human-like content with real-time streaming.
          </p>
        </div>

        {/* Main Layout - Left/Right Panels */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Left Panel - Input */}
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <Wand2 className="w-5 h-5 text-purple-400" />
                  Before (Original Text)
                </CardTitle>
                <CardDescription>
                  Enter the text you want to humanize
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Textarea
                    placeholder="Paste your AI-generated or robotic text here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[300px] bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-purple-500 transition-colors resize-none"
                  />
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
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
                  <Label className="text-white text-sm font-medium">Quick Examples</Label>
                  <div className="space-y-1 mt-2">
                    {EXAMPLE_TEXTS.map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full h-auto p-2 text-left justify-start border-gray-700 hover:border-purple-500 text-gray-300 hover:text-white transition-colors text-xs leading-tight"
                        onClick={() => loadExample(FULL_EXAMPLE_TEXTS[index])}
                      >
                        <span className="text-left">{example}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Panel - Output */}
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2 text-lg">
                      <Zap className="w-5 h-5 text-green-400" />
                      After (Humanized Text)
                    </CardTitle>
                    <CardDescription>
                      Your transformed, human-like content
                    </CardDescription>
                  </div>
                  
                  {/* Stats in Header */}
                  <div className="flex items-center gap-4 text-sm">
                    {result?.style_applied && (
                      <div className="text-right">
                        <div className="text-gray-400 text-xs">Style</div>
                        <div className="text-white font-medium">
                          {HUMANIZATION_STYLES.find(s => s.value === result.style_applied)?.label || 'N/A'}
                        </div>
                      </div>
                    )}
                    
                    {(result?.confidence_score || isLoading) && (
                      <div className="text-right">
                        <div className="text-gray-400 text-xs">Confidence</div>
                        <div className={`text-white font-medium ${isLoading ? 'animate-pulse' : ''}`}>
                          {isLoading ? '...' : `${result.confidence_score ? Math.round(result.confidence_score * 100) : 0}%`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
                    value={outputText}
                    readOnly
                    placeholder={isLoading ? "" : "Humanized text will appear here"}
                    className={`min-h-[300px] bg-gray-800 border-gray-700 text-white resize-none focus:border-purple-500 ${isLoading ? 'animate-pulse' : ''}`}
                  />
                  {outputText && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(outputText)}
                      className="absolute top-3 right-3 border-gray-700 hover:border-purple-500 bg-gray-900/80 backdrop-blur-sm"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
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
                    <div className="absolute top-3 left-3">
                      <div className="flex items-center gap-2 bg-purple-600/20 backdrop-blur-sm px-2 py-1 rounded-md border border-purple-500/30">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span className="text-purple-300 text-xs font-medium">Live</span>
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
              <Label className="text-white text-sm font-medium">Style</Label>
              <Select value={style} onValueChange={(value: any) => setStyle(value)}>
                <SelectTrigger className="mt-2 bg-gray-800 border-gray-700 text-white hover:border-purple-500 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {HUMANIZATION_STYLES.map((styleOption) => (
                    <SelectItem key={styleOption.value} value={styleOption.value} className="text-white hover:bg-gray-700">
                      <div>
                        <div className="font-medium">{styleOption.label}</div>
                        <div className="text-xs text-gray-400">{styleOption.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Length Control */}
            <div>
              <Label className="text-white text-sm font-medium">Length</Label>
              <Select value={length} onValueChange={(value: any) => setLength(value)}>
                <SelectTrigger className="mt-2 bg-gray-800 border-gray-700 text-white hover:border-purple-500 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {LENGTH_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-white hover:bg-gray-700">
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-gray-400">{option.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-white text-sm font-medium">Preserve Terms</Label>
                <Switch
                  checked={preserveTerms}
                  onCheckedChange={setPreserveTerms}
                />
              </div>
              <input
                type="text"
                placeholder="Target audience (optional)"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none transition-colors text-sm"
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
                <Button
                  onClick={humanizeTextStream}
                  disabled={!inputText.trim() || characterCount > 5000}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                  size="lg"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Humanize
                </Button>
              )}
            </div>
          </div>

          {/* Key Improvements */}
          {result?.changes_made && result.changes_made.length > 0 && outputText && (
            <Card className="bg-gray-900/50 border-purple-500/20 mt-6">
              <CardHeader>
                <CardTitle className="text-white text-lg">Key Improvements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {result.changes_made.slice(0, 4).map((change: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-300">{change}</span>
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