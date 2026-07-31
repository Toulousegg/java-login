import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("role"));

    const login = (jwt, role) => {
        localStorage.setItem("token", jwt);
        localStorage.setItem("role", role);
        setToken(jwt);
        setRole(role);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        setRole(null);
    };

    const isAdmin = () => role === "ADMIN";
    console.log("Role:", role);
    return (
        <AuthContext.Provider value={{ token, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}