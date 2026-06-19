import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Chat } from "./components/Chat";
import { NotFound } from "./components/NotFound";
import { Sources } from "./components/Sources";

export function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Chat />} />
                    <Route path="/sources" element={<Sources />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )

}