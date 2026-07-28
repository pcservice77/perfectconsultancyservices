'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Send, X, Bot, User, Loader2, MessageCircle } from 'lucide-react';
import { askTaxAssistant } from '@/ai/flows/tax-assistant-flow';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

export default function TaxAssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! I am your PCS AI Assistant. How can I help you with your taxes or business compliance today?', sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await askTaxAssistant({ query: input });
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        text: result.response + (result.suggestedAction ? `\n\n💡 ${result.suggestedAction}` : ''), 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: Message = { id: (Date.now() + 1).toString(), text: "I'm sorry, I encountered an error. Please try again or contact our team.", sender: 'ai' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen ? (
        <Card className="mb-4 w-[350px] sm:w-[400px] h-[500px] flex flex-col rounded-[2rem] glass border-white/40 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <CardHeader className="bg-primary p-6 text-white flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-black">AI Assistant</CardTitle>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Always Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 p-4 overflow-hidden bg-slate-50/50 backdrop-blur-sm">
            <ScrollArea className="h-full pr-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm",
                      msg.sender === 'user' 
                        ? "bg-primary text-white rounded-tr-none" 
                        : "bg-white text-slate-800 rounded-tl-none border border-slate-100"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-xs font-bold text-slate-400">PCS AI is thinking...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-4 bg-white border-t border-slate-100">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full items-center gap-2">
              <Input 
                placeholder="Ask about GST, ITR..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="h-12 rounded-xl glass border-slate-200 focus:ring-primary/20"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" className="h-12 w-12 rounded-xl shrink-0 shadow-lg shadow-primary/20" disabled={isLoading}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 hover:scale-110 transition-all group"
        >
          <Sparkles className="h-8 w-8 group-hover:rotate-12 transition-transform" />
        </Button>
      )}
    </div>
  );
}
