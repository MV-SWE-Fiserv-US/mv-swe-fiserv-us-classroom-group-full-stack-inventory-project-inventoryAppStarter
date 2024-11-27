import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.isAdmin) {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin }}>{children}</AuthContext.Provider>
  );
};
