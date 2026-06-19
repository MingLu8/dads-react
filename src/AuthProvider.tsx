import type { AuthContextValue } from "./types";

export function AuthProvider({value, children}: {value: AuthContextValue, children: React.ReactNode}) {
    return <AuthProvider    value={value}>{children}</AuthProvider>;    
}