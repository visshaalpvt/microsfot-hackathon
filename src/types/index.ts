export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  dealValue: number;
  stage: 'lead' | 'contacted' | 'negotiation' | 'proposal' | 'closed';
  status: 'hot' | 'warm' | 'cold';
  avatar?: string;
  phone?: string;
  createdAt: string;
  lastContact?: string;
  notes?: string;
  updatedAt?: string;
}

export interface Memory {
  id: string;
  clientId: string;
  type: 'objection' | 'success' | 'strategy' | 'preference' | 'context' | 'failure' | 'behavior';
  content: string;
  tags: string[];
  metadata?: Record<string, unknown>;
  createdAt?: string;
  timestamp?: string;
  success?: boolean;
  impact?: 'high' | 'medium' | 'low';
}

export interface Message {
  id: string;
  clientId: string;
  role?: 'user' | 'assistant' | 'system' | 'client';
  content: string;
  memories?: string[];
  createdAt?: string;
  timestamp?: string;
  confidence?: number;
  sender?: 'user' | 'ai' | 'client';
  memory?: {
    retrieved: boolean;
    pastObjections: string[];
    behaviorPatterns: string[];
    winningStrategies: string[];
    failedAttempts: string[];
  };
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'pattern' | 'suggestion' | 'warning' | 'objection_trend' | 'success_pattern' | 'strategy_suggestion' | 'risk_alert';
  createdAt?: string;
  timestamp?: string;
  confidence?: number;
  suggestion?: string;
}

export interface AIMemory {
  clientId: string;
  query: string;
  results: {
    memory: Memory;
    score: number;
  }[];
}

export interface DealStats {
  totalDeals: number;
  activeDeals: number;
  winRate: number;
  suggestionsToday: number;
  avgDealSize: number;
  objectionRate: number;
}
