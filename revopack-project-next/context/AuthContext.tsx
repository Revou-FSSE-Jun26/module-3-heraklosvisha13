"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import type { User } from "@/lib/types";

/* =======================================================
   1. TIPE CONTEXT
   ======================================================= */
interface AuthContextValue {
    currentUser: User | null;
    isLoggedIn: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

/* =======================================================
   2. INISIALISASI CONTEXT
   ======================================================= */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* =======================================================
   3. PROVIDER CONTEXT
   ======================================================= */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("token");

            if (storedUser && storedToken) {
                setCurrentUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to restore session:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    function login(user: User, token: string) {
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    }

    function logout() {
        setCurrentUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isLoggedIn: currentUser !== null,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

/* =======================================================
   4. CUSTOM HOOK UNTUK MENGGUNAKAN CONTEXT
   ======================================================= */
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
