import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import apiURL from "./api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const getClientSecret = async () => {
    const response = await fetch(`${apiURL}/payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ total: 1000 }),
    });

    const { clientSecret } = await response.json();
    setClientSecret(clientSecret);
  };

  useEffect(() => {
    getClientSecret();
  }, []);

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
    <AuthContext.Provider value={{ isAdmin, isLoggedIn, clientSecret }}>
      {children}
    </AuthContext.Provider>
  );
};
