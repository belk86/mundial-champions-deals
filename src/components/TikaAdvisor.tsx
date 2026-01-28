import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const TikaAdvisor = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      const greeting = language === 'ar' 
        ? 'مرحباً! أنا تيكا، مستشارتك الذكية للتسوق. كيف يمكنني مساعدتك في العثور على أفضل منتجات كأس العالم 2026؟ ⚽'
        : language === 'es'
        ? '¡Hola! Soy Tika, tu asesora de compras inteligente. ¿Cómo puedo ayudarte a encontrar los mejores productos del Mundial 2026? ⚽'
        : 'Hey there! I\'m Tika, your AI shopping advisor. How can I help you find the perfect World Cup 2026 gear today? ⚽';
      
      setMessages([{ role: 'assistant', content: greeting }]);
    }
  }, [isOpen, language]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let assistantContent = '';

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tika-advisor`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            message: input,
            language,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) throw new Error('No reader available');

      // Add assistant message placeholder
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      let buffer = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: assistantContent,
                };
                return newMessages;
              });
            }
          } catch {
            // Incomplete JSON, continue
          }
        }
      }
    } catch (error) {
      console.error('Tika error:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: language === 'ar'
            ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
            : language === 'es'
            ? 'Lo siento, ocurrió un error. Por favor, inténtalo de nuevo.'
            : 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Small Floating Purple Circle - Compact toggle */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center text-primary-foreground glow-purple-sm"
          whileHover={{ scale: 1.1, boxShadow: '0 0 25px hsl(270, 100%, 60%, 0.6), 0 0 50px hsl(270, 100%, 60%, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <Sparkles className="w-5 h-5" />
        </motion.button>
      )}

      {/* Compact Chat Window - Only visible when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[320px] max-w-[calc(100vw-3rem)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Tika</h3>
                  <p className="text-white/80 text-xs">
                    {language === 'ar' ? 'مستشارتك الذكية' : language === 'es' ? 'Tu Asesora IA' : 'AI Shopping Advisor'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages - Compact height */}
            <div className="h-64 overflow-y-auto p-3 space-y-3 bg-background">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-purple-600 text-white rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    {msg.content || (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    language === 'ar'
                      ? 'اسأل تيكا...'
                      : language === 'es'
                      ? 'Pregunta a Tika...'
                      : 'Ask Tika...'
                  }
                  className="flex-1 bg-muted rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  className="rounded-full bg-purple-600 hover:bg-purple-500"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TikaAdvisor;
