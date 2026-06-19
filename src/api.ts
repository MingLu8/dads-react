import type { ChatApiResponse, ChatMessage } from "./types";

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
  const response = await fetch('/api/session', {
    method: 'POST',
    headers: header(token),
  });

  if (!response.ok) {
    throw new Error(`Session request failed with status ${response.status}`);
  }

  const data = (await response.json()) as { sessionId: string };
  return data.sessionId;
}

export async function sendChat(sessionId: string, message: string, token?: string): Promise<ChatApiResponse> {
  const chatMessage: ChatMessage = {
    id: crypto.randomUUID(),
    content: message,
    role: 'user',
  };
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: header(token),
    body: JSON.stringify({ chatMessage, sessionId }),
  });

  if (!response.ok) {
    throw new Error(`Chat request failed with status ${response.status}`);
  }

  return (await response.json()) as ChatApiResponse;
}
