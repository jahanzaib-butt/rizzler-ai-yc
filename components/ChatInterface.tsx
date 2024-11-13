"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Message, Personality } from '@/types/chat';
import { MessageList } from '@/components/MessageList';
import { PersonalitySelector } from '@/components/PersonalitySelector';
import { generateChatResponse } from '@/lib/groq';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [personality, setPersonality] = useState<Personality>('Smooth');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (!trimmedInput || isLoading) return;

    if (!process.env.NEXT_PUBLIC_GROQ_API_KEY) {
      toast({
        title: "Configuration Error",
        description: "Please set up your GROQ API key in the environment variables.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = { 
      role: 'user', 
      content: trimmedInput 
    };

    try {
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      const content = await generateChatResponse(
        [...messages, userMessage],
        personality
      );
      
      const assistantMessage: Message = {
        role: 'assistant',
        content
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 max-w-screen-xl flex flex-col min-h-screen">
        <div className="text-center space-y-2 py-4">
          <h1 className="text-4xl sm:text-7xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-transparent bg-clip-text">
            RizzGPT
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Your AI-powered conversation companion
          </p>
        </div>

        <div className="mb-4">
          <PersonalitySelector 
            selected={personality}
            onSelect={setPersonality}
          />
        </div>

        <Card className="flex-1 flex flex-col bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-0 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-purple-500/5 pointer-events-none" />
          
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            <MessageList 
              messages={messages}
              isLoading={isLoading}
            />
          </div>

          <div className="flex-shrink-0 p-4 border-t border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Chat with ${personality} RizzGPT...`}
                className="bg-white/80 dark:bg-gray-800/80 border-0 focus-visible:ring-purple-500"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={isLoading}
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-full w-10 h-10 shrink-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}