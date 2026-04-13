# DealMind AI - Specification Document

## 1. Concept & Vision

**DealMind AI** is a memory-powered sales intelligence agent that transforms how sales teams handle client conversations. Unlike generic chatbots, it becomes smarter over time by remembering every interaction, objection, and successful response. It feels like having a seasoned sales mentor who never forgets a detail and continuously learns from every deal.

The experience should feel **futuristic yet grounded** — like talking to a knowledgeable colleague who has perfect recall and strategic insight.

---

## 2. Design Language

### Aesthetic Direction
Dark, sophisticated SaaS interface inspired by Stripe Dashboard and Linear. Clean lines, subtle gradients, and purposeful use of accent colors to highlight AI insights and memory features.

### Color Palette
```css
--bg-primary: #0F172A      /* Deep slate - main background */
--bg-secondary: #1E293B   /* Elevated surfaces */
--bg-tertiary: #334155     /* Cards, panels */
--accent-primary: #6366F1  /* Indigo - primary actions */
--accent-secondary: #22C55E /* Emerald - success, AI insights */
--accent-warning: #F59E0B  /* Amber - warnings, pending */
--accent-danger: #EF4444   /* Red - errors, hot leads */
--text-primary: #F8FAFC   /* White - main text */
--text-secondary: #94A3B8  /* Slate - secondary text */
--text-muted: #64748B     /* Muted labels */
--border: #334155          /* Borders, dividers */
--glass: rgba(30, 41, 59, 0.8) /* Glass panels */
```

### Typography
- **Headings**: Inter (700, 600) - clean, modern sans-serif
- **Body**: Inter (400, 500) - highly readable
- **Monospace**: JetBrains Mono - for code/technical elements
- **Scale**: 12px / 14px / 16px / 20px / 24px / 32px / 48px

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px
- Border radius: 8px (buttons), 12px (cards), 16px (panels), 24px (modals)
- Max content width: 1400px

### Motion Philosophy
- **Entrance**: Fade in + slide up (300ms ease-out)
- **Hover states**: Scale 1.02, subtle glow (150ms)
- **Loading**: Pulsing skeleton with gradient shimmer
- **AI thinking**: Typing dots animation with glow effect
- **Memory retrieval**: Highlight flash when memory is accessed

### Visual Assets
- **Icons**: Lucide React (consistent stroke width)
- **Charts**: Recharts with custom styling
- **Decorative**: Gradient orbs, subtle grid patterns, glass morphism panels

---

## 3. Layout & Structure

### Overall Architecture
```
┌─────────────────────────────────────────────────────────────┐
│  Sidebar (fixed, 240px)  │  Main Content Area               │
│  ─────────────────────   │  ─────────────────────────────── │
│  • Logo                  │  • Top Bar (search, profile)      │
│  • Navigation            │  • Page Content                  │
│  • Quick Stats           │  • Floating AI Assistant (chat) │
└─────────────────────────────────────────────────────────────┘
```

### Page Structure

#### Dashboard
- Hero stats row (4 cards: Total Deals, Active, Win Rate, AI Suggestions)
- Two-column layout: Charts (left 60%), AI Insights (right 40%)
- Recent activity timeline at bottom

#### Chat Agent (Main Feature)
- Three-column layout:
  - Left (25%): Client list with status indicators
  - Center (50%): Chat interface with message history
  - Right (25%): Memory panel showing retrieved context

#### Client Profiles
- Header with client avatar and key metrics
- Tabbed content: Overview | Timeline | Analysis | Strategies

#### Analytics
- Grid of chart cards (2x2)
- Full-width insight cards below

#### Settings
- Sectioned form layout
- API key inputs with visibility toggle
- Theme and preference toggles

### Responsive Strategy
- **Desktop (1200px+)**: Full three-column layouts
- **Tablet (768-1199px)**: Collapsible sidebar, two-column content
- **Mobile (< 768px)**: Bottom navigation, stacked layouts

---

## 4. Features & Interactions

### Core Feature: Conversation Memory

**Storage Behavior**:
- Every user message is tagged with: `client_id`, `type` (objection/question/followup), `sentiment`
- AI responses are stored with: `strategy_used`, `memory_references`, `success_prediction`
- Objections are auto-categorized: `price`, `trust`, `competitor`, `timing`, `feature`

**Retrieval Behavior**:
- On new message, system searches relevant memories
- Memories ranked by: recency, frequency, relevance score
- Top 5 memories shown in right panel with source indicators

**Memory Types**:
```typescript
interface Memory {
  id: string;
  clientId: string;
  type: 'objection' | 'success' | 'strategy' | 'preference' | 'context';
  content: string;
  tags: string[];
  metadata: Record<string, any>;
  createdAt: Date;
  success?: boolean;
}
```

### Smart Follow-ups

**Trigger Conditions**:
- After price objection: Show pricing alternatives
- After 48h no response: Suggest follow-up template
- After competitor mention: Show competitive comparison

**Generation**:
- Context-aware response drafts
- One-click send or edit
- Tone options: formal, casual, urgent

### Deal Timeline

**Visual Representation**:
- Vertical timeline with milestone markers
- Color-coded by outcome
- Clickable nodes for detail expansion

### Strategy Suggestions

**Pattern Recognition**:
- Identifies what worked before with similar clients
- Suggests timing for next action
- Provides confidence score (based on past success rate)

---

## 5. Component Inventory

### Navigation Components

**Sidebar**
- States: expanded (default), collapsed (icon-only), mobile (overlay)
- Active item: indigo left border, subtle background highlight
- Hover: background lighten, icon scale 1.1

**TopBar**
- Search: expandable input with ⌘K hint
- Profile: dropdown with avatar, name, logout

### Data Display

**StatCard**
- States: default, loading (skeleton), trend-up (green arrow), trend-down (red arrow)
- Hover: subtle lift (translateY -2px), shadow increase

**ClientListItem**
- States: default, selected (indigo bg), unread (dot indicator)
- Elements: avatar, name, company, status badge, last message preview

**MessageBubble**
- Variants: user (right-aligned, indigo), AI (left-aligned, slate), system (centered, muted)
- AI messages show: thinking indicator → content → memory references

**MemoryPanel**
- Sections: Objections, Behaviors, Strategies
- Each item: icon, label, count badge, expand for details
- Active: highlighted border when memory used in response

### Charts

**DealProgressChart**: Line chart showing pipeline stages over time
**ObjectionChart**: Donut chart with category breakdown
**SuccessPatternCard**: Horizontal bar showing win rates by strategy

### Forms

**Input**
- States: default, focus (indigo ring), error (red ring + message), disabled
- Variants: text, textarea, search (with icon)

**Button**
- Variants: primary (indigo), secondary (outline), ghost, danger
- States: default, hover, active, loading (spinner), disabled
- Sizes: sm (32px), md (40px), lg (48px)

**Toggle**
- States: off (gray), on (indigo), disabled
- Animation: slide + color transition (200ms)

### Feedback

**Toast**
- Variants: success (green), error (red), info (blue), warning (amber)
- Auto-dismiss after 5s with progress bar
- Position: bottom-right

**Tooltip**
- Dark background, white text, arrow pointer
- Delay: 300ms before show

**LoadingSkeleton**
- Pulsing gradient animation
- Matches shape of content it replaces

---

## 6. Technical Approach

### Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **State**: React Context + useReducer for global state
- **AI**: Groq API (llama-3.1-8b-instant)
- **Memory**: Hindsight (localStorage for MVP)
- **Charts**: Recharts
- **Icons**: Lucide React

### Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout with sidebar
│   ├── page.tsx            # Dashboard
│   ├── chat/page.tsx       # Chat interface
│   ├── clients/[id]/page.tsx
│   ├── analytics/page.tsx
│   └── settings/page.tsx
├── components/
│   ├── ui/                 # Base components (Button, Input, Card)
│   ├── layout/             # Sidebar, TopBar, Layout wrappers
│   ├── chat/               # Chat-specific components
│   ├── dashboard/          # Dashboard widgets
│   └── clients/            # Client-related components
├── lib/
│   ├── memory.ts           # Hindsight integration
│   ├── ai.ts               # Groq API integration
│   ├── store.ts            # Global state management
│   └── utils.ts            # Helpers
└── types/
    └── index.ts            # TypeScript definitions
```

### API Design

**AI Chat Endpoint** (simulated for MVP):
```typescript
POST /api/chat
Request: {
  message: string;
  clientId: string;
  history: Message[];
}
Response: {
  response: string;
  memories: Memory[];
  suggestions: string[];
  confidence: number;
}
```

### Data Model

**Client**:
```typescript
interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  dealValue: number;
  stage: 'lead' | 'qualified' | 'negotiation' | 'closed-won' | 'closed-lost';
  status: 'hot' | 'warm' | 'cold';
  createdAt: Date;
}
```

**Message**:
```typescript
interface Message {
  id: string;
  clientId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  memories?: string[];  // IDs of memories used
  createdAt: Date;
}
```

### Storage Strategy
- **Hindsight**: Semantic memory storage with tagging
- **localStorage**: Client data, message history, user preferences
- **Session**: Temporary AI responses during generation

### Key Implementation Details

1. **Memory Retrieval Flow**:
   ```
   User Input → Embed Query → Search Hindsight → Rank Results → Inject into Prompt → Generate Response
   ```

2. **Response Generation**:
   - System prompt includes retrieved memories
   - Temperature 0.7 for balanced creativity
   - Max tokens: 500 for responses, 1000 for strategies

3. **Optimistic Updates**:
   - Messages appear instantly
   - AI response streams in with typing effect
   - Memory panel updates after response complete

---

## 7. Demo Data

### Sample Clients
```typescript
const clients = [
  {
    id: '1',
    name: 'Sarah Chen',
    company: 'TechFlow Inc',
    email: 'sarah@techflow.com',
    dealValue: 45000,
    stage: 'negotiation',
    status: 'hot'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    company: 'DataSync Solutions',
    email: 'marcus@datasync.io',
    dealValue: 28000,
    stage: 'qualified',
    status: 'warm'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    company: 'CloudScale Partners',
    email: 'elena@cloudscale.com',
    dealValue: 67000,
    stage: 'lead',
    status: 'cold'
  }
];
```

### Sample Memories
```typescript
const memories = [
  {
    id: 'mem1',
    clientId: '1',
    type: 'objection',
    content: 'Price is too high for our budget this quarter',
    tags: ['price', 'budget', 'quarterly'],
    success: false
  },
  {
    id: 'mem2',
    clientId: '1',
    type: 'success',
    content: 'Responded with flexible payment terms - positive reaction',
    tags: ['payment', 'flexibility'],
    success: true
  }
];
```
