import { useAuth } from "../hooks/useAuth";
import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "dads__navlink dads__navlink--active" : "dads__navlink";

export function Layout(){
    const {userEmail, onLogout} = useAuth();
    return (
        <div className="dads">
            <header className="dads__header">
                <div className="dads__header">
                    <div className="dads__brand">
                        <span className="dads__logo">D</span>
                        <div>
                            <h1>Dads</h1>
                            <p>Drug Adjudication Diagnostic System -- React</p>
                        </div>
                    </div>
                </div>
                <nav className="dads__nav">
                    <NavLink to="/" end className={linkClass}>Chat</NavLink>
                    <NavLink to="/history" className={linkClass}>History</NavLink>
                    <NavLink to="/sources" className={linkClass}>Sources</NavLink>
                </nav>
                <div className="dads__actions">
                    {userEmail && <span className="dads__user">{userEmail}</span>}
                    <button onClick={onLogout} className="dads__btn">
                        Logout
                    </button>
                </div>
            </header>
            <Outlet />
        </div>
    )
}