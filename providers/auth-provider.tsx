"use client";
import { getUser } from "@/app/_actions/actions";
import Loading from "@/app/loading";
import { useUser } from "@clerk/nextjs";
import { Email, EmailPreference, User } from "@prisma/client";
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
  refreshUser: () => void;
}

interface clientUserType extends User {
  emailPreferences: EmailPreference;
  emails: Email[];
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
        clerkUser?.primaryEmailAddress?.emailAddress as string,
        clerkUser?.fullName as string,
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
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clerkUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        user: clientUser,
        refreshUser: getDetailsHandler,
      }}
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
