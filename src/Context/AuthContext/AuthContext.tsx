import { createContext, type ReactNode } from "react";
import { type Role } from "../../types/types";
import { useState, useContext, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, getIdTokenResult, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../configs/firebase"

type User = {
    email : string,
    uid: string,
    role: Role,
}

type RegistrationProps = {
    email: string,
    password: string,
    role: Role,
}

type LoginProps = {
    email: string,
    password: string,
}

type AuthContextType = {
    register: ({email, password, role}: RegistrationProps) => Promise<void>,
    login: ({email, password}: Omit<RegistrationProps, "role">) => Promise<void>,
    logout: () => Promise<void>
    user: User | null
}

const AuthContext = createContext<AuthContextType | null>(null)


export function AuthProvider({children} : {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const tokenResult = await getIdTokenResult(firebaseUser);
                const role = tokenResult.claims.role;
        
                setUser({
                    email: firebaseUser.email!,
                    uid: firebaseUser.uid,
                    role: role as Role || "viewer", // fallback if no role
                });

                navigate('/main')
            } else {
                setUser(null);
            }
        });
      
        return () => unsubscribe(); // Clean up listener
      }, []);
    async function register({email, password, role} : RegistrationProps) {
        try {
            const res = await fetch("https://us-central1-cortex-e091e.cloudfunctions.net/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, role }),
            });
        
            if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to register");
            }
        
            const data = await res.json();
            setUser(data)
            console.log("User registered:", data);

            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard')
            
            return data;
        } catch (err) {
            console.error("Registration error:", err);
            throw err;
        }
    } 
    
    async function login({email, password} : LoginProps) {

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const {user} = userCredential

            const idTokenResult = await user.getIdTokenResult();
            const role = idTokenResult.claims.role;

            setUser({
                email: user?.email ? user.email : '',
                uid: user.uid,
                role: role as Role,
            })
            
            navigate('/main')
        } catch (err) {
            console.error("Registration error:", err);
            throw err;
        }
    }

    async function logout() {
        await signOut(auth);
        setUser(null);
        navigate('/');
    }


    return (
    <AuthContext.Provider
        value={{
            register,
            user,
            login,
            logout
        }}
    >
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};