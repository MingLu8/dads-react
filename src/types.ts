export type Role = 'user' | 'bot' | 'system';

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