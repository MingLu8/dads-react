import React from "react";
import type { AuthContextValue } from "../types";

const AuthContext = React.createContext<AuthContextValue>({});

export function useAuth(): AuthContextValue {
   return React.useContext(AuthContext);
}