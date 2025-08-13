import React, { useState, useCallback } from 'react';
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
import { Copy, Wand2, AlertCircle, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HUMANIZATION_STYLES = [
  { value: 'CONVERSATIONAL', label: 'Conversational', description: 'Direct and engaging tone' },
  { value: 'CASUAL', label: 'Casual', description: 'Relaxed and informal tone' },
  { value: 'PROFESSIONAL', label: 'Professional', description: 'Business-appropriate tone' },
  { value: 'ACADEMIC', label: 'Academic', description: 'Scholarly and formal tone' },
  { value: 'TECHNICAL', label: 'Technical', description: 'Precise and informative tone' },
  { value: 'CREATIVE', label: 'Creative', description: 'Imaginative and expressive tone' },
];

const LENGTH_OPTIONS = [
  { value: 'PRESERVE', label: 'Preserve', description: 'Keep similar length' },
  { value: 'EXPAND', label: 'Expand', description: 'Add more detail and examples' },
  { value: 'CONDENSE', label: 'Condense', description: 'Make more concise' },
];

const EXAMPLE_TEXTS = [
  "The system processes data through multiple algorithmic layers to optimize performance metrics and deliver enhanced user experience outcomes.",
  "Implementation of advanced caching mechanisms results in substantial performance improvements across distributed systems.",
  "Machine learning models require extensive data preprocessing and feature engineering to achieve optimal accuracy.",
];

export default function TextHumanizer() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [style, setStyle] = useState('CONVERSATIONAL');
  const [length, setLength] = useState('PRESERVE');
  const [preserveTerms, setPreserveTerms] = useState(true);
  const [targetAudience, setTargetAudience] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const characterCount = inputText.length;
  const estimatedTokens = Math.ceil(inputText.split(/\s+/).filter(word => word.length > 0).length * 1.3);

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
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  }, [toast]);

  const loadExample = (example: string) => {
    setInputText(example);
    setError(null);
  };

  const humanizeText = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to humanize');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setOutputText('');

    try {
      const response = await fetch('/api/humanize', {
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      if (data.success && data.data) {
        setResult(data.data);
        setOutputText(data.data.humanized_text);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast({
        title: "Humanization failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedStyle = HUMANIZATION_STYLES.find(s => s.value === style);
  const selectedLength = LENGTH_OPTIONS.find(l => l.value === length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950">
      <Header />
      
      <main className="container py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Text Humanizer
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl">
            Transform AI-generated or robotic text into natural, human-like content. 
            Choose from multiple styles and customize the output for your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-purple-400" />
                  Input Text
                </CardTitle>
                <CardDescription>
                  Enter the text you want to humanize
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="input-text" className="text-white">Text to humanize</Label>
                  <Textarea
                    id="input-text"
                    placeholder="Paste your AI-generated or robotic text here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[200px] mt-2 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
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

                {/* Examples */}
                <div>
                  <Label className="text-white">Quick Examples</Label>
                  <div className="space-y-2 mt-2">
                    {EXAMPLE_TEXTS.map((example, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="h-auto p-3 text-left justify-start border-gray-700 hover:border-purple-500 text-gray-300 hover:text-white"
                        onClick={() => loadExample(example)}
                      >
                        <div className="truncate">{example}</div>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Options */}
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Humanization Options</CardTitle>
                <CardDescription>
                  Customize how your text should be transformed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Style Selection */}
                <div>
                  <Label className="text-white">Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="mt-2 bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {HUMANIZATION_STYLES.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          <div>
                            <div className="font-medium">{style.label}</div>
                            <div className="text-sm text-gray-400">{style.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedStyle && (
                    <p className="text-sm text-gray-400 mt-1">{selectedStyle.description}</p>
                  )}
                </div>

                {/* Length Control */}
                <div>
                  <Label className="text-white">Length</Label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger className="mt-2 bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LENGTH_OPTIONS.map((length) => (
                        <SelectItem key={length.value} value={length.value}>
                          <div>
                            <div className="font-medium">{length.label}</div>
                            <div className="text-sm text-gray-400">{length.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedLength && (
                    <p className="text-sm text-gray-400 mt-1">{selectedLength.description}</p>
                  )}
                </div>

                {/* Technical Terms */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Preserve Technical Terms</Label>
                    <p className="text-sm text-gray-400">Keep technical terminology unchanged</p>
                  </div>
                  <Switch
                    checked={preserveTerms}
                    onCheckedChange={setPreserveTerms}
                  />
                </div>

                {/* Target Audience */}
                <div>
                  <Label className="text-white">Target Audience (Optional)</Label>
                  <input
                    type="text"
                    placeholder="e.g., developers, general audience, students"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full mt-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none"
                  />
                </div>

                {/* Humanize Button */}
                <Button
                  onClick={humanizeText}
                  disabled={isLoading || !inputText.trim() || characterCount > 5000}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Humanizing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Humanize Text
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  Humanized Text
                </CardTitle>
                <CardDescription>
                  Your transformed, human-like content
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
                        onClick={humanizeText}
                        className="ml-4 border-red-500/40 text-red-300 hover:bg-red-500/20"
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Retry
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                {outputText ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <Textarea
                        value={outputText}
                        readOnly
                        className="min-h-[200px] bg-gray-800 border-gray-700 text-white"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(outputText)}
                        className="absolute top-2 right-2 border-gray-700 hover:border-purple-500"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    {result && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <Label className="text-gray-400">Style Applied</Label>
                          <p className="text-white font-medium">
                            {HUMANIZATION_STYLES.find(s => s.value === result.style_applied)?.label}
                          </p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg">
                          <Label className="text-gray-400">Confidence</Label>
                          <p className="text-white font-medium">
                            {Math.round((result.confidence_score || 0) * 100)}%
                          </p>
                        </div>
                      </div>
                    )}

                    {result?.changes_made && result.changes_made.length > 0 && (
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <Label className="text-gray-400">Key Improvements</Label>
                        <ul className="text-white text-sm mt-2 space-y-1">
                          {result.changes_made.slice(0, 3).map((change: string, index: number) => (
                            <li key={index}>• {change}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="min-h-[200px] bg-gray-800 border border-gray-700 rounded-md flex items-center justify-center">
                    <p className="text-gray-400">
                      {isLoading ? 'Humanizing your text...' : 'Humanized text will appear here'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Usage Tips */}
            <Card className="bg-gray-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Usage Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• <strong>Conversational</strong> works best for blog posts and casual content</li>
                  <li>• <strong>Professional</strong> is ideal for business communications</li>
                  <li>• <strong>Technical</strong> maintains accuracy while improving readability</li>
                  <li>• Use <strong>Expand</strong> to add examples and detailed explanations</li>
                  <li>• <strong>Preserve Terms</strong> keeps technical jargon intact</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}