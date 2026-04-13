import { Client, Memory, Message } from '@/types';

const OBJECTION_PATTERNS = {
  price: ['price', 'expensive', 'cost', 'budget', 'afford', 'cheaper', 'discount'],
  trust: ['trust', 'reliability', 'proven', 'references', 'security', 'certification'],
  competitor: ['competitor', 'alternative', 'other', 'comparable', 'compared'],
  timing: ['timing', 'later', 'now', 'rush', 'deadline', 'quarter', 'year'],
  feature: ['feature', 'missing', 'need', 'capability', 'integration', 'api'],
};

function detectObjectionType(text: string): string[] {
  const lower = text.toLowerCase();
  const detected: string[] = [];
  
  Object.entries(OBJECTION_PATTERNS).forEach(([type, patterns]) => {
    if (patterns.some(p => lower.includes(p))) {
      detected.push(type);
    }
  });
  
  return detected.length > 0 ? detected : ['general'];
}

function calculateConfidence(memories: Memory[], query: string): number {
  const relevantMemories = memories.filter(m => 
    m.content.toLowerCase().includes(query.toLowerCase()) ||
    m.tags.some(t => query.toLowerCase().includes(t))
  );
  
  if (relevantMemories.length === 0) return 60;
  if (relevantMemories.length >= 3) return 90;
  return 70 + (relevantMemories.length * 5);
}

function generateFollowUpSuggestions(memories: Memory[], objectionTypes: string[]): string[] {
  const suggestions: string[] = [];
  
  if (objectionTypes.includes('price')) {
    suggestions.push('Offer flexible payment terms');
    suggestions.push('Highlight ROI and long-term savings');
    const successMemories = memories.filter(m => m.success && m.tags.includes('price'));
    if (successMemories.length > 0) {
      suggestions.push('Reference: "We helped similar clients manage costs effectively"');
    }
  }
  
  if (objectionTypes.includes('trust')) {
    suggestions.push('Share customer testimonials');
    suggestions.push('Offer a pilot program');
    suggestions.push('Provide case studies');
  }
  
  if (objectionTypes.includes('competitor')) {
    suggestions.push('Focus on unique differentiators');
    suggestions.push('Offer competitive comparison');
  }
  
  if (objectionTypes.includes('timing')) {
    suggestions.push('Create urgency with limited-time offer');
    suggestions.push('Align with their fiscal year');
  }
  
  return suggestions;
}

export async function generateAIResponse(
  message: string,
  client: Client,
  memories: Memory[],
  _conversationHistory: Message[]
): Promise<{
  response: string;
  memories: Memory[];
  suggestions: string[];
  confidence: number;
}> {
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
  
  const objectionTypes = detectObjectionType(message);
  const retrievedMemories = memoryStore.searchMemories(client.id, message);
  
  const relevantMemories = retrievedMemories.length > 0 ? retrievedMemories : memories.slice(0, 3);
  const confidence = calculateConfidence(relevantMemories, message);
  
  let responseContent = '';
  
  const memoryContext = relevantMemories.length > 0 
    ? `\nContext from past interactions:\n${relevantMemories.map(m => `- ${m.content}${m.success ? ' (worked)' : ''}`).join('\n')}`
    : '';
  
  if (objectionTypes.includes('price') || message.toLowerCase().includes('price') || message.toLowerCase().includes('expensive') || message.toLowerCase().includes('cost')) {
    if (relevantMemories.some(m => m.success)) {
      responseContent = `Based on our successful approach with similar clients, I recommend a tailored pricing strategy that addresses their budget concerns. ${memoryContext}\n\nKey approach: Offer flexible payment terms and emphasize the long-term ROI.`;
    } else {
      responseContent = `I understand price sensitivity is a key concern here. Let me help craft a response that addresses this while maintaining deal value.\n\nConsider: Flexible payment options, tiered pricing, or value-based pricing adjustments.`;
    }
  } else if (objectionTypes.includes('competitor') || message.toLowerCase().includes('competitor') || message.toLowerCase().includes('alternative')) {
    responseContent = `When facing competitor comparisons, it's important to focus on unique value propositions rather than direct feature matching.\n\nKey talking points: Differentiation strategy, total cost of ownership, support quality, and proven results.`;
  } else if (objectionTypes.includes('timing') || message.toLowerCase().includes('time') || message.toLowerCase().includes('later')) {
    responseContent = `Timing objections often mask other concerns. Let's probe deeper while being respectful of their timeline.\n\nApproach: Acknowledge their timeline, create subtle urgency around value, and offer to schedule a follow-up.`;
  } else if (objectionTypes.includes('trust') || message.toLowerCase().includes('trust') || message.toLowerCase().includes('reliability')) {
    responseContent = `Building trust is crucial at this stage. Let's address their concerns with concrete evidence.\n\nStrategy: Share relevant case studies, offer references, and consider a pilot or proof of concept.`;
  } else {
    responseContent = `Great input from the client. Let's analyze this carefully.\n\n${memoryContext}\n\nRecommended next step: Maintain engagement, address any implicit concerns, and move the conversation toward a decision.`;
  }
  
  const suggestions = generateFollowUpSuggestions(relevantMemories, objectionTypes);
  
  return {
    response: responseContent,
    memories: relevantMemories,
    suggestions,
    confidence,
  };
}

import { memoryStore } from './memory';

export function createInitialMemories(clientId: string): Memory[] {
  const now = new Date().toISOString();
  
  return [
    {
      id: `mem_${clientId}_1`,
      clientId,
      type: 'objection',
      content: 'Initial contact established - interested in learning more about pricing',
      tags: ['intro', 'pricing', 'interest'],
      createdAt: now,
      success: true,
      impact: 'high',
    },
    {
      id: `mem_${clientId}_2`,
      clientId,
      type: 'objection',
      content: 'Price is too high for current budget allocation',
      tags: ['price', 'budget', 'objection'],
      createdAt: now,
      success: false,
      impact: 'high',
    },
    {
      id: `mem_${clientId}_3`,
      clientId,
      type: 'strategy',
      content: 'Successfully addressed pricing concern with flexible payment terms',
      tags: ['payment', 'flexibility', 'success'],
      createdAt: now,
      success: true,
      impact: 'high',
    },
  ];
}
