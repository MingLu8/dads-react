export type Role = 'user' | 'bot' | 'system';

export interface ChatMessage {
  id: string;
  content: string;
  role: Role;
}

export interface ChatApiResponse {
  reply: ChatMessage;
  history: ChatMessage[];
}

export interface AuthContextValue{
  getToken?: () => Promise<string | undefined>;
  userEmail?: string;
  onLogout?: () => void;
}