import { createContext, useState } from "react";
import type { PropsWithChildren } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
//took from the internet