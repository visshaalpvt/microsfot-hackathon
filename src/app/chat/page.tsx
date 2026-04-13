'use client';

import { useState, useEffect, useRef } from 'react';
import { useApp, useClientMessages, useClientMemories } from '@/lib/store';
import ClientList from '@/components/chat/ClientList';
import MessageBubble from '@/components/chat/MessageBubble';
import MemoryPanel from '@/components/chat/MemoryPanel';
import Card from '@/components/ui/Card';
import { Client, Message, Memory } from '@/types';
import { generateAIResponse } from '@/lib/ai';
import { memoryStore } from '@/lib/memory';
import { generateId } from '@/lib/utils';
import { Send, Plus, Sparkles, Lightbulb, MessageSquare } from 'lucide-react';

export default function ChatPage() {
  const { state, dispatch } = useApp();
  const { clients, selectedClientId } = state;
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedClient = clients.find(c => c.id === selectedClientId) || null;
  const messages = useClientMessages(selectedClientId);
  const memories = useClientMemories(selectedClientId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectClient = (client: Client) => {
    dispatch({ type: 'SELECT_CLIENT', payload: client.id });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedClient) return;

    const userMessage: Message = {
      id: generateId(),
      clientId: selectedClient.id,
      role: 'user',
      content: inputMessage.trim(),
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    memoryStore.addMessage(userMessage);
    
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    const aiResponse = await generateAIResponse(
      currentInput,
      selectedClient,
      memories,
      messages
    );

    const tags: string[] = [];
    const lowerInput = currentInput.toLowerCase();
    
    if (lowerInput.includes('price') || lowerInput.includes('expensive') || lowerInput.includes('cost')) {
      tags.push('objection:price');
    }
    if (lowerInput.includes('competitor') || lowerInput.includes('alternative')) {
      tags.push('objection:competitor');
    }
    if (lowerInput.includes('trust') || lowerInput.includes('reliability')) {
      tags.push('objection:trust');
    }
    if (lowerInput.includes('time') || lowerInput.includes('later')) {
      tags.push('objection:timing');
    }

    const newMemory: Memory = {
      id: generateId(),
      clientId: selectedClient.id,
      type: tags.length > 0 ? 'objection' : 'context',
      content: currentInput,
      tags: tags.length > 0 ? tags : ['context'],
      createdAt: new Date().toISOString(),
      success: false,
      impact: tags.length > 0 ? 'high' : 'medium',
    };

    dispatch({ type: 'ADD_MEMORY', payload: newMemory });
    memoryStore.addMemory(newMemory);

    const aiMessage: Message = {
      id: generateId(),
      clientId: selectedClient.id,
      role: 'assistant',
      content: aiResponse.response,
      memories: aiResponse.memories.map(m => m.id),
      createdAt: new Date().toISOString(),
      confidence: aiResponse.confidence,
    };

    dispatch({ type: 'ADD_MESSAGE', payload: aiMessage });
    memoryStore.addMessage(aiMessage);

    setSuggestions(aiResponse.suggestions);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] animate-fade-in">
      <div className="flex h-full gap-6">
        <div className="w-80 flex-shrink-0">
          <Card className="h-full flex flex-col">
            <div className="p-4 border-b border-[#334155]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                  Clients
                </h2>
                <button className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center hover:bg-indigo-500/20 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <ClientList
                clients={clients}
                selectedId={selectedClientId}
                onSelect={handleSelectClient}
              />
            </div>
          </Card>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <Card className="flex-1 flex flex-col overflow-hidden">
            {selectedClient ? (
              <>
                <div className="p-4 border-b border-[#334155] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">
                        {selectedClient.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-semibold text-white">{selectedClient.name}</h2>
                      <p className="text-sm text-slate-400">{selectedClient.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                      selectedClient.status === 'hot' ? 'bg-red-500/10 text-red-400' :
                      selectedClient.status === 'warm' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {selectedClient.status}
                    </span>
                    <span className="text-sm text-emerald-400 font-medium">
                      ${selectedClient.dealValue.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
                        <Sparkles className="w-8 h-8 text-indigo-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Start a Conversation</h3>
                      <p className="text-slate-400 max-w-sm">
                        Type a message to get AI-powered suggestions based on client memory and past interactions.
                      </p>
                    </div>
                  )}
                  
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      isAITyping={message.role === 'assistant' && isTyping && message.id === messages[messages.length - 1]?.id}
                    />
                  ))}
                  {isTyping && messages[messages.length - 1]?.role !== 'assistant' && (
                    <MessageBubble
                      message={{
                        id: 'typing',
                        clientId: selectedClient.id,
                        role: 'assistant',
                        content: '',
                        createdAt: new Date().toISOString(),
                      }}
                      isAITyping={true}
                    />
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {suggestions.length > 0 && (
                  <div className="px-4 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-medium text-amber-400">Suggested Follow-ups</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => setInputMessage(suggestion)}
                          className="px-3 py-1.5 text-sm bg-amber-500/10 text-amber-300 rounded-lg hover:bg-amber-500/20 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 border-t border-[#334155]">
                  <div className="flex items-center gap-3">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your message..."
                      rows={1}
                      className="flex-1 bg-[#334155] border border-[#475569] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 resize-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="h-[46px] px-4 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center justify-center"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
                  <MessageSquare className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Select a Client</h3>
                <p className="text-slate-400 max-w-md">
                  Choose a client from the list to start a conversation. The AI will analyze their history and provide context-aware suggestions.
                </p>
              </div>
            )}
          </Card>
        </div>

        <div className="w-80 flex-shrink-0">
          <Card className="h-full overflow-hidden">
            <MemoryPanel
              client={selectedClient}
              memories={memories}
              recentMemories={memories.slice(0, 3)}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
