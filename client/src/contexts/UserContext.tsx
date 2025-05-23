"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type UserType = {
  role: "unregistered" | "registered";
  name?: string;
  email?: string;
  password?: string;
};
type UserData = {
  email: string;
  password: string;
  name?: string;
};
type UserContextType = {
  user: UserType;
  register: (data: UserData) => Promise<boolean>;
  login: (data: UserData) => Promise<boolean>;
  logout: () => Promise<boolean>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  // Mockup user retrieval
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (user.email) {
      setUser(user);
    } else {
      setUser({ role: "unregistered" });
    }
  }, []);

  // Mockup user update
  useEffect(() => {
    if (user !== null) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Mockup login
  const login = async (data: UserData) => {
    try {
      setUser({ ...data, role: "registered" });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const register = async (data: UserData) => {
    try {
      // Create mockup database in localStorage with users
      let allUsers = JSON.parse(localStorage.getItem("Users") || "{}");
      allUsers = {
        ...allUsers,
        [data.email]: { name: data.name, password: data.password },
      };

      localStorage.setItem("Users", JSON.stringify(allUsers));

      if (data.name) {
        localStorage.setItem("userName", data["name"]);
      }

      setUser({ ...data, role: "registered" });

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  // Mockup logout
  const logout = async () => {
    sessionStorage.removeItem("user");
    setUser({ role: "unregistered" });
    return false;
  };

  if (user === null) {
    return;
  }

  return (
    <UserContext.Provider value={{ user, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
