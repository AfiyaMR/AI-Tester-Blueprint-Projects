# Project Constitution (gymini.md)

## Data Schemas
### Core Payload (Internal State)
```typescript
interface TestGenState {
  userInput: string; // The raw requirement or code from the user
  generatedOutput: string | null; // The raw response from Ollama
  status: 'idle' | 'loading' | 'success' | 'error';
}
```

### Ollama API Contract (External)
**Request:** `POST /api/generate`
```json
{
  "model": "llama3.2",
  "prompt": "[SYSTEM_PROMPT] + [USER_INPUT]",
  "stream": false
}
```

**Response:**
```json
{
  "response": "Generated content...",
  "done": true
}
```

## Behavioral Rules
1. **Reliability First**: Ensure the Ollama connection is validated before sending requests.
2. **Template-Driven**: The System Prompt is the source of truth for generation logic and must be stored in the codebase.
3. **User-Centric**: The UI must essentially be a "Chat" where the user inputs data and sees the result immediately.

## Architectural Invariants
1. **Client-Side Logic**: The application runs entirely in the browser (React + Vite).
2. **Local Intelligence**: No external cloud calls; strictly localhost:11434.
3. **Aesthetic Standard**: Premium, modern interface with dark mode and smooth transitions (Glassmorphism).
