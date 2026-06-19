import { useAuth0 } from "@auth0/auth0-react";
import { AppRoutes } from "./AppRoutes";
import { AuthProvider } from "./AuthProvider";

export function AuthedApp() {
    const { user, isLoading, isAuthenticated, loginWithRedirect, logout, getIdTokenClaims } = useAuth0();

    if(isLoading) {
        return <div>Loading...</div>;
    }

    if(!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-4">Welcome to the Chat Application</h1>
                <button onClick={() => loginWithRedirect()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
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