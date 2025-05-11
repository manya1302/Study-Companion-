
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Sparkles, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AiWriterPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4 md:px-6 space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Wand2 className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">AI Writing Assistant</h1>
        </div>
        <Button variant="outline" asChild>
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
        </Button>
      </div>

      <Card className="glassmorphism-card">
        <CardHeader>
          <CardTitle>Enhance Your Writing</CardTitle>
          <CardDescription>
            Use AI to improve grammar, rephrase sentences, summarize text, or generate ideas.
            This is a placeholder and not connected to a real AI model.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="inputText" className="text-sm font-medium">Your Text:</label>
              <Textarea id="inputText" placeholder="Enter or paste your text here..." className="min-h-[200px] bg-background/70" />
            </div>
            <div className="space-y-2">
              <label htmlFor="outputText" className="text-sm font-medium">AI Enhanced Text:</label>
              <Textarea id="outputText" placeholder="AI suggestions will appear here..." readOnly className="min-h-[200px] bg-muted/50 border-dashed" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-4">
            <Button className="gradient-bg text-primary-foreground">
              <Sparkles className="mr-2 h-4 w-4" /> Improve Grammar
            </Button>
            <Button variant="secondary">Rephrase Sentence</Button>
            <Button variant="secondary">Summarize Text</Button>
            <Button variant="secondary">Generate Ideas</Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Full AI writing capabilities would require integration with a backend AI service.
      </p>
    </motion.div>
  );
};

export default AiWriterPage;
  