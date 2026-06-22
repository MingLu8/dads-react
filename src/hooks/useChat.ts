import { useCallback, useEffectEvent, useRef, useState } from 'react';
import type { ChatMessage, Role } from '../types';
import { createSession, getSessionHistory, sendChat } from '../api';
import { useAuth } from './useAuth';

type UseChatReturn = {
  messages: ChatMessage[];
  busy: boolean;
  reset: () => void;
  resume: (id: string) => void;
  send: (content: string) => Promise<void>;
};

const createMessage = (role: Role, content: string): ChatMessage => ({
  role,
  content,
});



export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const sessionId = useRef<string|null>('');
  const { getToken } = useAuth();

  const send = useEffectEvent(
    async (content: string) => {
      const message = content.trim();
      if(!message || busy) return;

      const userMessage = createMessage('user', content);
      setMessages(prev => [...prev, userMessage]);
      setBusy(true);

      try{
        const token = getToken ? await getToken() : undefined;
        if(!sessionId.current) sessionId.current = await createSession(token);

        const chatApiResponse = await sendChat(sessionId.current, message, token);
        setMessages(prev => [...prev, createMessage('bot', chatApiResponse.message)])
      }
      catch{
        setMessages(prev=>[...prev, createMessage('system', 'I ran into a problem reaching the server, Please try again.')])
      } finally{
        setBusy(false);
      }
  });

  const reset = useCallback(
    ()=> {
      setMessages([]);
      sessionId.current = null;
    },
    [])

  const resume = useEffectEvent(async (id: string) => {
    const token = getToken? await getToken() : undefined;
    const data = await getSessionHistory(id, token);
    sessionId.current = data.sessionId;
    setMessages(data.history.map(a=> ({ role: a.role, content: a.content})));
  });

  return {
    messages,
    busy,
    reset,
    send,
    resume,
  };
}
