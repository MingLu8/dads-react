import { createContext, useContext, type ReactNode } from "react";
import { useChat } from "./hooks/useChat";

type ChatApi = ReturnType<typeof useChat>;

const ChatContext = createContext<ChatApi | null>(null);

export function ChatProvider({children }: {children: ReactNode }){
    const chat = useChat();
    return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>
}

export function useChatContext(): ChatApi{
    const ctx = useContext(ChatContext);
    if(!ctx) throw new Error('useChatContext must be used with <ChatProvider>');
    return ctx;
}