import { getFirebaseAuth } from "@/firebase/config";
import { User, onAuthStateChanged } from "firebase/auth";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

import React from "react";

const AuthContext = createContext({
  user: null as User | null,
});

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const auth = getFirebaseAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return setCurrentUser(user);
      }
      return setCurrentUser(user);
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
