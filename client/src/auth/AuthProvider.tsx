import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextInterface {
    is_authenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    token: string | null
}

const AuthContext = createContext<AuthContextInterface | null>(null)

// Function to access AuthContext to check if user is authenticated
export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("Error using AuthContext.")
    }

    return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Fetch token from localstorage.
    const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"))

    // If authToken exists, user is authenticated
    const is_authenticated = !!token;

    // Store authToken on Login
    const login = (newToken: string) => {
        localStorage.setItem("authToken", newToken)
        setToken(newToken)
    }

    // Remove authToken on logout
    const logout = () => {
        localStorage.removeItem("authToken")
        setToken(null)
    }

    // Update token in localstorage on change to `token`
    useEffect(() => {
      if (token) {
        localStorage.setItem("authToken", token);
      } else {
        localStorage.removeItem("authToken");
      }
    }, [token]);

    // Wrap children in Auth Provider
    return (
      <AuthContext.Provider value={{ is_authenticated, login, logout, token }}>
        {children}
      </AuthContext.Provider>
    );
}
