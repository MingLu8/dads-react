export type Role = 'user' | 'bot' | 'system';

// Which LLM answers a message. 'auto' = Gemini with local-Ollama fallback (backend default).
export type LlmProvider = 'auto' | 'gemini' | 'ollama';

export interface ChatMessage {
  content: string;
  role: Role;
}

export interface ChatApiResponse {
  message: string;
}

export interface SessionHistoryResponse{
  sessionId: string;
  history: {role: Role; content: string }[]
}

export interface SessionSummary{
  id: string;
  title: string;
  lastAccessedAt: number;
  messageCount: number;
}

export interface AuthContextValue{
  getToken?: () => Promise<string | undefined>;
  userEmail?: string;
  onLogout?: () => void;
}