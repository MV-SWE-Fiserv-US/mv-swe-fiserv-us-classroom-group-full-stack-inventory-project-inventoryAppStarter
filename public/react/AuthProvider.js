import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import apiURL from "./api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const getClientSecret = async () => {
    try {
      const response = await fetch(`${apiURL}/payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total: 1000 }),
      });
      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClientSecret();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      setUsername(decoded.name);
      setUserEmail(decoded.email);
      if (decoded.isAdmin) {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAdmin, isLoggedIn, userId, username, userEmail, clientSecret }}
    >
      {children}
    </AuthContext.Provider>
  );
};
