import { Memory, Client, Message } from '@/types';

const STORAGE_KEYS = {
  CLIENTS: 'dealmind_clients',
  MESSAGES: 'dealmind_messages',
  MEMORIES: 'dealmind_memories',
  INSIGHTS: 'dealmind_insights',
};

class MemoryStore {
  private getItem<T>(key: string): T[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  private setItem<T>(key: string, data: T[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(data));
  }

  addMemory(memory: Memory): void {
    const memories = this.getItem<Memory>(STORAGE_KEYS.MEMORIES);
    memories.push(memory);
    this.setItem(STORAGE_KEYS.MEMORIES, memories);
  }

  getMemories(clientId?: string): Memory[] {
    const memories = this.getItem<Memory>(STORAGE_KEYS.MEMORIES);
    if (clientId) {
      return memories.filter(m => m.clientId === clientId);
    }
    return memories;
  }

  searchMemories(clientId: string, query: string): Memory[] {
    const memories = this.getMemories(clientId);
    const lowerQuery = query.toLowerCase();
    
    return memories
      .map(memory => {
        let score = 0;
        if (memory.content.toLowerCase().includes(lowerQuery)) score += 3;
        if (memory.tags.some(t => t.toLowerCase().includes(lowerQuery))) score += 2;
        const createdAtVal = memory.createdAt || memory.timestamp;
        const age = createdAtVal ? Date.now() - new Date(createdAtVal).getTime() : 0;
        const daysSince = age / (1000 * 60 * 60 * 24);
        if (daysSince < 7) score += 2;
        if (daysSince < 1) score += 1;
        if (memory.success) score += 1;
        return { memory, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => item.memory);
  }

  updateMemory(id: string, updates: Partial<Memory>): void {
    const memories = this.getItem<Memory>(STORAGE_KEYS.MEMORIES);
    const index = memories.findIndex(m => m.id === id);
    if (index !== -1) {
      memories[index] = { ...memories[index], ...updates };
      this.setItem(STORAGE_KEYS.MEMORIES, memories);
    }
  }

  getClients(): Client[] {
    return this.getItem<Client>(STORAGE_KEYS.CLIENTS);
  }

  addClient(client: Client): void {
    const clients = this.getItem<Client>(STORAGE_KEYS.CLIENTS);
    clients.push(client);
    this.setItem(STORAGE_KEYS.CLIENTS, clients);
  }

  updateClient(id: string, updates: Partial<Client>): void {
    const clients = this.getItem<Client>(STORAGE_KEYS.CLIENTS);
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
      clients[index] = { ...clients[index], ...updates };
      this.setItem(STORAGE_KEYS.CLIENTS, clients);
    }
  }

  getMessages(clientId?: string): Message[] {
    const messages = this.getItem<Message>(STORAGE_KEYS.MESSAGES);
    if (clientId) {
      return messages.filter(m => m.clientId === clientId);
    }
    return messages;
  }

  addMessage(message: Message): void {
    const messages = this.getItem<Message>(STORAGE_KEYS.MESSAGES);
    messages.push(message);
    this.setItem(STORAGE_KEYS.MESSAGES, messages);
  }

  getInsights() {
    return this.getItem(STORAGE_KEYS.INSIGHTS);
  }

  addInsight(insight: Record<string, unknown>): void {
    const insights = this.getItem<Record<string, unknown>>(STORAGE_KEYS.INSIGHTS);
    insights.push(insight);
    this.setItem(STORAGE_KEYS.INSIGHTS, insights);
  }

  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    });
  }

  seedData(clients: Client[], memories: Memory[], messages: Message[]): void {
    this.setItem(STORAGE_KEYS.CLIENTS, clients);
    this.setItem(STORAGE_KEYS.MEMORIES, memories);
    this.setItem(STORAGE_KEYS.MESSAGES, messages);
  }
}

export const memoryStore = new MemoryStore();
