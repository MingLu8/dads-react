import { useAuth } from "../hooks/useAuth";
import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "underline font-semibold" : "hover:underline";

export function Layout(){
    const {userEmail, onLogout} = useAuth();
    return (
        <div className="flex flex-col h-screen">
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Chat Application</h1>
                <nav className="space-x-4">
                    <NavLink to="/" end className={linkClass}>Chat</NavLink>
                    <NavLink to="/sources" className={linkClass}>Sources</NavLink>
                </nav>
                <div className="flex items-center">
                    <span className="mr-4">{userEmail}</span>
                    <button onClick={onLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Logout
                    </button>
                </div>
            </header>
            <Outlet />
        </div>
    )
}