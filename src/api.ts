import type { ChatApiResponse, ChatMessage, LlmProvider, SessionHistoryResponse, SessionSummary } from "./types";
const sessionBase: string = '/api/sessions';

export function header(token?: string): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function createSession(token?: string): Promise<string> {
  const response = await fetch(sessionBase, {
    method: 'POST',
    headers: header(token),
    body: '{}'
  });

  if (!response.ok) {
    throw new Error(`Session request failed with status ${response.status}`);
  }

  const data = (await response.json()) as { sessionId: string };
  return data.sessionId;
}

export async function getSessions(token?: string): Promise<SessionSummary[]> {
  const res = await fetch(sessionBase, {headers: header(token)});
  if(!res.ok) throw new Error(`sessions failed: ${res.status}`);
  return (await res.json()) as SessionSummary[];
}

export async function deleteSession(id: string, token?: string): Promise<void>{
  const res = await fetch(`${sessionBase}/${encodeURIComponent(id)}`, {method: 'DELETE', headers: header(token)});
  if(!res.ok) throw new Error(`delete session ${id} failed: ${res.status}`);
}

export async function getSessionHistory(id:string, token?:string): Promise<SessionHistoryResponse>{
  const res = await fetch(`${sessionBase}/${encodeURIComponent(id)}`, {headers: header(token)});
  if(!res.ok) throw new Error(`session ${id} failed: ${res.status}`);
  return (await res.json()) as SessionHistoryResponse;
}

export async function sendChat(sessionId: string, message: string, provider: LlmProvider, token?: string): Promise<ChatApiResponse> {
  const chatMessage: ChatMessage = {
    content: message,
    role: 'user',
  };
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: header(token),
    body: JSON.stringify({ chatMessage, sessionId, provider }),
  });

  if (!response.ok) {
    throw new Error(`Chat request failed with status ${response.status}`);
  }

  return (await response.json()) as ChatApiResponse;
}
