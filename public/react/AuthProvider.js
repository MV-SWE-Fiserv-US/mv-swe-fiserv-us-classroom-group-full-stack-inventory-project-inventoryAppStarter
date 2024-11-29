import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      setUsername(decoded.name);
      if (decoded.isAdmin) {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, isLoggedIn, userId, username }}>
      {children}
    </AuthContext.Provider>
  );
};
