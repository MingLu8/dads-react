import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { useChatContext } from "../ChatContext"
import type { LlmProvider } from "../types"

const PROVIDERS: { id: LlmProvider; label: string }[] = [
    { id: 'auto', label: 'Auto (Gemini → Ollama)' },
    { id: 'gemini', label: 'Gemini' },
    { id: 'ollama', label: 'Ollama (local)' },
];

export function Chat() {
    const { messages, busy, send, reset, provider, setProvider } = useChatContext();
    const [draft, setDraft] = useState('')
    // const inputRef = useRef<HTMLTextAreaElement>(null);

    // Disabling the textarea while busy blurs it (disabled elements can't hold focus).
    // Restore focus once the agent responds so the user can keep typing.
    // useEffect(() => {
    //     if (!busy) inputRef.current?.focus();
    // }, [busy]);

    const submit = () =>{
        const content = draft.trim();
        if(!content || busy) return;

        setDraft('');
        void send(content);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            submit();
        }
    };

    return (
        <>
            <main className="dads__chat">
                {messages.length === 0 && (
                    <div className="dads__empty">
                        <p>Ask me something!</p>
                    </div>
                )}
                {messages.map((m, i)=> (
                    <div key={i} className={`bubble ${m.role === 'user' ? 'bubble--user' : 'bubble--dads'}`}>
                        <div className="bubble__text">{m.content}</div>
                        {
                            
                        }
                    </div>
                ))

                }
                {busy && (
                    <div className="bubble bubble--dads">
                        <div className="bubble__text typing">
                            Dads is thinking...
                        </div>
                    </div>
                )}
            </main>
            <footer className="dads__composer">
                <button type="button" className="dads__btn" onClick={reset} title="Start a new chat">New Chat</button>
                <textarea
                    // ref={inputRef}
                    value={draft}
                    onChange={e=> setDraft(e.target.value)}
                    onKeyDown={onKeyDown}
                    rows={1}
                    placeholder="How can I help you today?"
                    // disabled={busy}
                />
                <select
                    className="dads__llm"
                    value={provider}
                    onChange={e => setProvider(e.target.value as LlmProvider)}
                    title="Choose which model answers"
                    aria-label="LLM provider"
                >
                    {PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>
                <button type="button" className="dads__btn--primary" onClick={submit} disabled={busy || !draft.trim()}>Send</button>
            </footer>
        </>
    )      
}