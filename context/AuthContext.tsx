import React, { createContext, use, useEffect, useState } from "react";
import { User } from '../types/user';
import { auth } from "@/firebase";

const AuthContext = createContext<{user: User | null, loading: boolean}>({user: null, loading: false});

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                const mappedUser: User = {
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName ?? undefined,
                    email: firebaseUser.email ?? "",
                    password: "",
                    phone: firebaseUser.phoneNumber ? Number(firebaseUser.phoneNumber) : undefined,
                    avatar: firebaseUser.photoURL ?? undefined,
                };
                setUser(mappedUser);
                setLoading(false);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsubcribe;
    }, []);
    return (
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };