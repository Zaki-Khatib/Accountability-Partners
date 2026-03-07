import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    tag: string;
    photoUrl?: string;
    note?: string;
    motto?: string;
    focusArea?: string;
    journals?: { date: string, text: string }[];
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: (credential: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => Promise<void>;
    addJournal: (text: string) => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const loadUser = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const res = await fetch("/api/auth/me", {
                    headers: {
                        "x-auth-token": token
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser({ ...data, id: data._id });
                } else {
                    localStorage.removeItem("token");
                }
            } catch (e) {
                console.error("Failed to load user session", e);
            }
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (email: string, password: string) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Server is temporarily unavailable. Please try again in a moment.");
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Login failed");

        localStorage.setItem("token", data.token);
        await loadUser();
    };

    const signup = async (email: string, password: string, name: string) => {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name })
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Server is temporarily unavailable. Please try again in a moment.");
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Signup failed");

        localStorage.setItem("token", data.token);
        await loadUser();
    };

    const loginWithGoogle = async (credential: string) => {
        const res = await fetch("/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: credential })
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Server is temporarily unavailable. Please try again in a moment.");
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Google login failed");

        localStorage.setItem("token", data.token);
        await loadUser();
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    const addJournal = async (text: string) => {
        const token = localStorage.getItem("token");
        if (user && token) {
            try {
                const res = await fetch("/api/users/journals", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token
                    },
                    body: JSON.stringify({ text })
                });

                if (res.ok) {
                    const updatedJournals = await res.json();
                    setUser({ ...user, journals: updatedJournals });
                }
            } catch (e) {
                console.error("Failed to save journal", e);
            }
        }
    };

    const updateProfile = async (data: Partial<User>) => {
        const token = localStorage.getItem("token");
        if (user && token) {
            try {
                const res = await fetch("/api/users/profile", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token
                    },
                    body: JSON.stringify(data)
                });

                if (res.ok) {
                    const updatedData = await res.json();
                    setUser({ ...updatedData, id: updatedData._id });
                }
            } catch (e) {
                console.error("Failed to update profile", e);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, loginWithGoogle, signup, logout, updateProfile, addJournal, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
