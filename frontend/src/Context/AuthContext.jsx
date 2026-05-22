import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const getStoredToken = () => {
        const token = localStorage.getItem("token");
        if (!token || token === "null" || token === "undefined") return null;
        return token;
    }

    const getStoredUser = () => {
        try {
            const user = localStorage.getItem("user");
            if (!user || user === "null" || user === "undefined") return null;
            return JSON.parse(user);
        } catch {
            return null;
        }
    }

    const [token, setToken] = useState(getStoredToken);
    const [user, setUser] = useState(getStoredUser);

    const login = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}