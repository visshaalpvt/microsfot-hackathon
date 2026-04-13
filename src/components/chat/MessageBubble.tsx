'use client';

import { Message } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { Bot, User, Sparkles, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MessageBubbleProps {
  message: Message;
  isAITyping?: boolean;
}

export default function MessageBubble({ message, isAITyping }: MessageBubbleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [showMemory, setShowMemory] = useState(false);
  
  useEffect(() => {
    if (message.role === 'assistant' && message.content) {
      setDisplayedText('');
      let i = 0;
      const timer = setInterval(() => {
        if (i < message.content.length) {
          setDisplayedText(message.content.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 15);
      return () => clearInterval(timer);
    } else {
      setDisplayedText(message.content);
    }
  }, [message.content, message.role]);

  const isUser = message.role === 'user';
  const isAI = message.role === 'assistant';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3 max-w-[80%]`}>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-indigo-500' 
            : 'bg-gradient-to-br from-emerald-500 to-teal-600'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>
        
        <div className="space-y-2">
          <div
            className={`px-4 py-3 rounded-2xl ${
              isUser
                ? 'bg-indigo-500 text-white rounded-br-md'
                : 'bg-[#1E293B] border border-[#334155] text-slate-200 rounded-bl-md'
            }`}
          >
            {isAITyping ? (
              <div className="flex items-center gap-2">
                <span className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
                <span className="text-sm text-slate-400">DealMind is thinking...</span>
              </div>
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{displayedText}</p>
            )}
          </div>
          
          <div className={`flex items-center gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-slate-500">
              {formatRelativeTime(message.createdAt)}
            </span>
            {isAI && message.confidence && (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {message.confidence}% confidence
              </span>
            )}
          </div>
          
          {isAI && !isAITyping && (
            <button
              onClick={() => setShowMemory(!showMemory)}
              className={`text-xs flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all ${
                showMemory 
                  ? 'bg-indigo-500/20 text-indigo-400' 
                  : 'bg-[#334155]/50 text-slate-400 hover:text-indigo-400'
              }`}
            >
              <Brain className="w-3 h-3" />
              {showMemory ? 'Hide Memory Context' : 'Show Memory Context'}
            </button>
          )}
          
          {showMemory && isAI && message.memories && message.memories.length > 0 && (
            <div className="bg-[#334155]/30 border border-indigo-500/20 rounded-xl p-3 animate-fade-in">
              <p className="text-xs font-medium text-indigo-400 mb-2 flex items-center gap-1.5">
                <Brain className="w-3 h-3" />
                Retrieved from Memory
              </p>
              <ul className="space-y-1.5">
                {message.memories.map((memId) => (
                  <li key={memId} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                    {memId}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
