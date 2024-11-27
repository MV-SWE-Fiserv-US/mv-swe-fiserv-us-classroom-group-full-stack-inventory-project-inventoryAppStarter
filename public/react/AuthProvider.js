import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decoded = jwtDecode(token);
      if (decoded.isAdmin) {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
