import { useAuth0 } from "@auth0/auth0-react";
import { AppRoutes } from "./AppRoutes";
import { AuthProvider } from "./AuthProvider";

export function AuthedApp() {
    const { user, isLoading, isAuthenticated, loginWithRedirect, logout, getIdTokenClaims } = useAuth0();

    if(isLoading) {
        return (
            <div className="dads">
                <main className="dads__login">
                    <p>Loading...</p>
                </main>
            </div>
        );
    }

    if(!isAuthenticated) {
        return (
            <div className="dads">
                <main className="dads__login">
                    <div className="dads__login-card">
                        <h2>Sign in to Dads</h2>
                        <p>Access is restricted.</p>
                        <button className="dads__btn dads__btn--primary" onClick={()=> loginWithRedirect()}>Log in</button>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <AuthProvider value={{
            getToken: async () => (await getIdTokenClaims())?.__raw,
            userEmail: user?.email,
            onLogout: () => logout({logoutParams: { returnTo: window.location.origin }})
        }}>
            <AppRoutes />
        </AuthProvider>
    );
}