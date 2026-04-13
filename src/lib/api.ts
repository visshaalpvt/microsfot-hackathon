const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const url = `${API_URL}/api/${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    throw error;
  }
}

export const api = {
  clients: {
    list: () => fetchAPI('clients'),
    get: (id: string) => fetchAPI(`clients/${id}`),
    create: (data: any) => fetchAPI('clients', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
  
  memory: {
    list: (clientId: string) => fetchAPI(`memory/${clientId}`),
    add: (data: any) => fetchAPI('memory', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
  
  stats: {
    get: () => fetchAPI('stats'),
  },
  
  insights: {
    list: () => fetchAPI('insights'),
  },
  
  chat: {
    send: (clientId: string, content: string) => fetchAPI('chat', {
      method: 'POST',
      body: JSON.stringify({ clientId, content, messageType: 'user' }),
    }),
  },
};

export default api;
