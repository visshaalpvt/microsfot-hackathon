import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function formatRelativeTime(dateString?: string): string {
  if (!dateString) return 'Just now';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'hot':
      return 'text-red-400 bg-red-400/10';
    case 'warm':
      return 'text-amber-400 bg-amber-400/10';
    case 'cold':
      return 'text-blue-400 bg-blue-400/10';
    default:
      return 'text-gray-400 bg-gray-400/10';
  }
}

export function getStageColor(stage: string): string {
  switch (stage) {
    case 'lead':
      return 'bg-blue-500';
    case 'qualified':
      return 'bg-indigo-500';
    case 'negotiation':
      return 'bg-amber-500';
    case 'closed-won':
      return 'bg-emerald-500';
    case 'closed-lost':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
}

export function getTypeIcon(type: string): string {
  switch (type) {
    case 'objection':
      return '⚠️';
    case 'success':
      return '✓';
    case 'strategy':
      return '🎯';
    case 'preference':
      return '💡';
    case 'context':
      return '📝';
    default:
      return '•';
  }
}
