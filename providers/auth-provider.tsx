"use client";
import { getUser } from "@/app/_actions/actions";
import { useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
// Define the shape of the context data
interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: clientUserType | null;
}

interface clientUserType extends User {
  emailPreferences: any[];
  emails: any[];
  timeZone: string | null;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider component
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [clientUser, setClientUser] = useState<any>(null);
  const { user: clerkUser } = useUser();

  const getDetailsHandler = async () => {
    try {
      const response = await getUser(
        clerkUser?.primaryEmailAddress?.emailAddress as string
      );
      setClientUser(response.user);
      setIsAuthenticated(true);
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clerkUser) {
      getDetailsHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clerkUser]);

  if (loading) {
    return (
      <div className="fixed z-[51] inset-0 bg-background flex items-center justify-center">
        <h1 className="font-bold text-3xl">Loading Wishly</h1>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, user: clientUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useClientAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useClientAuth };
