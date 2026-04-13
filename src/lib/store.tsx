'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Client, Memory, Message } from '@/types';
import { memoryStore } from './memory';
import { mockClients, mockMemories, mockMessages } from './data';

interface AppState {
  clients: Client[];
  selectedClientId: string | null;
  memories: Memory[];
  messages: Message[];
  isLoading: boolean;
}

type Action =
  | { type: 'SET_CLIENTS'; payload: Client[] }
  | { type: 'SELECT_CLIENT'; payload: string | null }
  | { type: 'ADD_CLIENT'; payload: Client }
  | { type: 'UPDATE_CLIENT'; payload: { id: string; updates: Partial<Client> } }
  | { type: 'SET_MEMORIES'; payload: Memory[] }
  | { type: 'ADD_MEMORY'; payload: Memory }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  clients: [],
  selectedClientId: null,
  memories: [],
  messages: [],
  isLoading: true,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_CLIENTS':
      return { ...state, clients: action.payload };
    case 'SELECT_CLIENT':
      return { ...state, selectedClientId: action.payload };
    case 'ADD_CLIENT':
      return { ...state, clients: [...state.clients, action.payload] };
    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload.updates } : c
        ),
      };
    case 'SET_MEMORIES':
      return { ...state, memories: action.payload };
    case 'ADD_MEMORY':
      return { ...state, memories: [...state.memories, action.payload] };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let clients = memoryStore.getClients();
    let memories = memoryStore.getMemories();
    let messages = memoryStore.getMessages();

    if (clients.length === 0) {
      memoryStore.seedData(mockClients, mockMemories, mockMessages);
      clients = mockClients;
      memories = mockMemories;
      messages = mockMessages;
    }

    dispatch({ type: 'SET_CLIENTS', payload: clients });
    dispatch({ type: 'SET_MEMORIES', payload: memories });
    dispatch({ type: 'SET_MESSAGES', payload: messages });
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

export function useSelectedClient() {
  const { state } = useApp();
  return state.clients.find(c => c.id === state.selectedClientId) || null;
}

export function useClientMemories(clientId: string | null) {
  const { state } = useApp();
  if (!clientId) return [];
  return state.memories.filter(m => m.clientId === clientId);
}

export function useClientMessages(clientId: string | null) {
  const { state } = useApp();
  if (!clientId) return [];
  return state.messages.filter(m => m.clientId === clientId);
}
