import React, { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";


interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  signup: (userData: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  authTokens: string | null;
  user: User | null;
  loading: boolean;
}

interface UserData {
  email: string;
  password: string;
}

const defaultContextValue: AuthContextType = {
  signup: async () => { console.warn("signup function not implemented"); },
  login: async () => { console.warn("login function not implemented"); },
  logout: () => { console.warn("logout function not implemented"); },
  authTokens: null,
  user: null,
  loading: false,
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

export default AuthContext;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authTokens, setAuthTokens] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookie.get('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<User>(token);
        setAuthTokens(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Token decoding error:", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const signup = async (userData: UserData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log({data: data})
      
      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      if (data.access_token) {
        const decodedToken = jwtDecode<User>(data.access_token);
        setAuthTokens(data.access_token);
        setUser(decodedToken);
        Cookie.set('token', data.access_token); // Store token in cookie
        router.push("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("Sending values:", { email, password });


      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.access_token) {
        const decodedToken = jwtDecode<User>(data.access_token);
        setAuthTokens(data.access_token);
        setUser(decodedToken);
        Cookie.set('token', data.access_token); // Store token in cookie
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    setAuthTokens(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ signup, login, logout, authTokens, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};