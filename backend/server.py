from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
import uuid
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="DealMind AI Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Memory(BaseModel):
    clientId: str
    type: str
    content: str
    tags: List[str]
    metadata: Dict[str, Any]
    timestamp: Optional[str] = None

class MessageInput(BaseModel):
    clientId: str
    content: str
    messageType: str

class Client(BaseModel):
    id: str
    name: str
    company: str
    email: str
    phone: str
    dealValue: int
    stage: str
    status: str
    createdAt: str
    updatedAt: str

memory_store: Dict[str, List[Dict]] = {}
client_store: Dict[str, Dict] = {}

demo_clients = [
    {
        "id": "1",
        "name": "Sarah Chen",
        "company": "ABC Corp",
        "email": "sarah.chen@abccorp.com",
        "phone": "+1 (555) 123-4567",
        "dealValue": 75000,
        "stage": "negotiation",
        "status": "hot",
        "createdAt": "2026-03-15T10:00:00Z",
        "updatedAt": "2026-04-12T14:30:00Z"
    },
    {
        "id": "2",
        "name": "Michael Torres",
        "company": "XYZ Ltd",
        "email": "m.torres@xyzltd.com",
        "phone": "+1 (555) 234-5678",
        "dealValue": 45000,
        "stage": "proposal",
        "status": "warm",
        "createdAt": "2026-03-20T09:00:00Z",
        "updatedAt": "2026-04-10T11:00:00Z"
    },
    {
        "id": "3",
        "name": "Emily Watson",
        "company": "Nova Inc",
        "email": "emily.w@novainc.io",
        "phone": "+1 (555) 345-6789",
        "dealValue": 120000,
        "stage": "closed",
        "status": "warm",
        "createdAt": "2026-02-01T08:00:00Z",
        "updatedAt": "2026-04-05T16:00:00Z"
    },
    {
        "id": "4",
        "name": "David Kim",
        "company": "TechStart",
        "email": "david.kim@techstart.io",
        "phone": "+1 (555) 456-7890",
        "dealValue": 35000,
        "stage": "lead",
        "status": "cold",
        "createdAt": "2026-04-11T14:00:00Z",
        "updatedAt": "2026-04-11T14:00:00Z"
    },
    {
        "id": "5",
        "name": "Jessica Martinez",
        "company": "GlobalTech",
        "email": "j.martinez@globaltech.com",
        "phone": "+1 (555) 567-8901",
        "dealValue": 95000,
        "stage": "negotiation",
        "status": "hot",
        "createdAt": "2026-03-01T10:00:00Z",
        "updatedAt": "2026-04-12T09:00:00Z"
    }
]

for client in demo_clients:
    client_store[client["id"]] = client
    memory_store[client["id"]] = []

initial_memories = {
    "1": [
        {
            "id": "1",
            "clientId": "1",
            "type": "objection",
            "content": "Price is too high",
            "tags": ["objection:price", "priority:high"],
            "metadata": {"frequency": 2, "resolved": False},
            "timestamp": "2026-04-10T10:00:00Z"
        },
        {
            "id": "2",
            "clientId": "1",
            "type": "objection",
            "content": "Needs approval from CFO",
            "tags": ["objection:approval", "priority:medium"],
            "metadata": {"frequency": 1, "resolved": False},
            "timestamp": "2026-04-11T14:00:00Z"
        },
        {
            "id": "3",
            "clientId": "1",
            "type": "strategy",
            "content": "Offer tiered pricing to address budget concerns",
            "tags": ["strategy:tiered-pricing", "success_rate:high"],
            "metadata": {"suggested": True, "applied": False},
            "timestamp": "2026-04-11T14:05:00Z"
        },
        {
            "id": "4",
            "clientId": "1",
            "type": "behavior",
            "content": "Slow decision maker - needs comprehensive info",
            "tags": ["behavior:slow-decision", "type:analytical"],
            "metadata": {"confidence": 0.85},
            "timestamp": "2026-04-12T09:00:00Z"
        }
    ],
    "2": [
        {
            "id": "5",
            "clientId": "2",
            "type": "objection",
            "content": "Currently using competitor product",
            "tags": ["objection:competitor", "priority:high"],
            "metadata": {"competitor": "CompetitorX", "frequency": 1},
            "timestamp": "2026-04-08T10:00:00Z"
        },
        {
            "id": "6",
            "clientId": "2",
            "type": "success",
            "content": "Successfully closed with 15% discount + premium support",
            "tags": ["strategy:discount", "success"],
            "metadata": {"discount": 15, "addons": ["premium-support"]},
            "timestamp": "2026-04-05T16:00:00Z"
        }
    ]
}

for client_id, memories in initial_memories.items():
    memory_store[client_id] = memories

@app.get("/")
async def root():
    return {"message": "DealMind AI Backend running", "status": "active"}

@app.get("/api/clients")
async def get_clients():
    return list(client_store.values())

@app.get("/api/clients/{client_id}")
async def get_client(client_id: str):
    if client_id not in client_store:
        raise HTTPException(status_code=404, detail="Client not found")
    return client_store[client_id]

@app.get("/api/memory/{client_id}")
async def get_client_memory(client_id: str):
    if client_id not in memory_store:
        return []
    return memory_store[client_id]

@app.post("/api/memory")
async def add_memory(memory: Memory):
    if memory.clientId not in memory_store:
        memory_store[memory.clientId] = []
    
    if not memory.timestamp:
        memory.timestamp = datetime.now().isoformat()
    
    mem_dict = {
        "id": str(uuid.uuid4()),
        "clientId": memory.clientId,
        "type": memory.type,
        "content": memory.content,
        "tags": memory.tags,
        "metadata": memory.metadata,
        "timestamp": memory.timestamp
    }
    
    memory_store[memory.clientId].append(mem_dict)
    return {"success": True, "memory": mem_dict}

@app.post("/api/chat")
async def chat(message: MessageInput):
    client_id = message.clientId
    user_message = message.content
    
    memories = memory_store.get(client_id, [])
    
    objections = [m for m in memories if m["type"] == "objection"]
    behaviors = [m for m in memories if m["type"] == "behavior"]
    strategies = [m for m in memories if m["type"] == "strategy"]
    failures = [m for m in memories if m["type"] == "failure"]
    
    response_content = ""
    memory_context = {
        "retrieved": len(memories) > 0,
        "pastObjections": [o["content"] for o in objections],
        "behaviorPatterns": [b["content"] for b in behaviors],
        "winningStrategies": [s["content"] for s in strategies if s.get("metadata", {}).get("applied", False)],
        "failedAttempts": [f["content"] for f in failures]
    }
    
    lower_msg = user_message.lower()
    
    if "price" in lower_msg or "cost" in lower_msg or "expensive" in lower_msg:
        if objections:
            response_content = f"Based on memory, this client has raised price objections {len([o for o in objections if 'price' in o['content'].lower()])}x before. I recommend offering tiered pricing with flexible payment terms."
            if failures:
                response_content += " Past approach: 'generic discount' - FAILED. Better approach: highlight ROI and offer extended payment terms."
            else:
                response_content += " Consider highlighting the 6-month ROI to justify the investment."
        else:
            response_content = "This client hasn't raised price objections before. You can proceed with standard pricing but always be prepared for budget discussions."
    
    elif "demo" in lower_msg or "meeting" in lower_msg or "call" in lower_msg:
        if behaviors:
            response_content = "Based on client's analytical behavior pattern, a technical demo would be highly effective. I recommend a 45-minute session covering integration specifics."
            for b in behaviors:
                if "analytical" in b["content"].lower():
                    response_content += " This client values comprehensive information - prepare detailed technical documentation."
        else:
            response_content = "I can schedule a demo with our solutions engineer. What specific features would you like to showcase?"
    
    elif "decision" in lower_msg or "approve" in lower_msg or "cfo" in lower_msg:
        response_content = "Based on past interactions, this client typically needs 2 weeks for approval. To accelerate: send case studies of similar companies and create urgency with pricing expiry."
    
    else:
        if memories:
            response_content = f"Based on memory retrieval ({len(memories)} past interactions): This client is in {client_store.get(client_id, {}).get('stage', 'unknown')} stage with {client_store.get(client_id, {}).get('status', 'unknown')} lead status."
            if behaviors:
                response_content += f" Behavior insights: {behaviors[0]['content']}"
            if strategies:
                response_content += f" Recommended strategy: {strategies[0]['content']}"
        else:
            response_content = "No memory found for this client yet. I'll start building their profile from this interaction."
    
    memory_entry = {
        "id": str(uuid.uuid4()),
        "clientId": client_id,
        "type": "message",
        "content": user_message,
        "tags": ["interaction"],
        "metadata": {"sender": "user"},
        "timestamp": datetime.now().isoformat()
    }
    
    if client_id in memory_store:
        memory_store[client_id].append(memory_entry)
    else:
        memory_store[client_id] = [memory_entry]
    
    return {
        "response": response_content,
        "memory": memory_context,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/stats")
async def get_stats():
    total_deals = len(client_store)
    active_deals = len([c for c in client_store.values() if c["stage"] not in ["closed"]])
    closed_deals = len([c for c in client_store.values() if c["stage"] == "closed"])
    win_rate = int((closed_deals / total_deals * 100)) if total_deals > 0 else 0
    
    return {
        "totalDeals": total_deals,
        "activeDeals": active_deals,
        "winRate": win_rate,
        "suggestionsToday": 14,
        "avgDealSize": 65000,
        "objectionRate": 45
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)