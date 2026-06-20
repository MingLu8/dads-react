import { useCallback, useEffectEvent, useRef, useState } from 'react';
import { createId } from '../utils';
import type { ChatMessage, Role } from '../types';
import { createSession, sendChat } from '../api';
import { useAuth } from './useAuth';

type UseChatReturn = {
  messages: ChatMessage[];
  busy: boolean;
  reset: () => void;
  send: (content: string) => Promise<void>;
};

const createMessage = (role: Role, content: string): ChatMessage => ({
  id: createId(),
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

  return {
    messages,
    busy,
    reset,
    send,
  };
}
