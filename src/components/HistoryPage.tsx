import { useEffect, useState } from "react";
import type { SessionSummary } from "../types";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../ChatContext";
import { getSessions } from "../api";

export function HistoryPage(){
    const [sessions, setSessions] = useState<SessionSummary[] | null>(null); 
    const [error, setError] = useState(false);
    const chat = useChatContext();
    const navigate = useNavigate();

    useEffect(()=> {
        let active = true;
        getSessions()
            .then(a=> { if(active) setSessions(a); })
            .catch(()=> { if(active) setError(true); });
        return () => {active = false;};

    }, []);

    const open = async (id: string) => {
        await chat.resume(id);
        navigate('/');
    }

    return (
        <main className="page">
            <h2>Past conversations</h2>
            <p className="page__sub">Pick up where you left off.</p>
            {error && <p className="page__error">Couldn't load your conversations.</p>}
            {!sessions && ! error && <p>Loading...</p>}
            {sessions && sessions.length === 0 && (
                <p className="dads__empty">No past conversations yet.</p>
            )}
            {sessions && sessions.length > 0 && (
                <ul className="sources">
                    {sessions.map(a=> (
                        <li key={a.id} className="sources__item history__item" onClick={()=> open(a.id)}
                            role="button" tabIndex={0}
                            onKeyDown={e=> { if(e.key === 'Enter') open(a.id);}}>
                            <span className="sources__label">{a.title}</span>
                            <span className="sources__status">{a.messageCount} msgs. {new Date(a.lastAccessedAt).toLocaleDateString()}</span>
                        </li>
                    ))}
                </ul>
                
            )}
        </main>
    )
}
