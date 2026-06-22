import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Chat } from "./components/Chat";
import { NotFound } from "./components/NotFound";
import { Sources } from "./components/Sources";
import { HistoryPage } from "./components/HistoryPage";
import { ChatProvider } from "./ChatContext";

export function AppRoutes(){
    return (
        <BrowserRouter>
            <ChatProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Chat />} />
                        <Route path="/history" element={<HistoryPage />} />
                        <Route path="/sources" element={<Sources />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </ChatProvider>
        </BrowserRouter>
    )

}