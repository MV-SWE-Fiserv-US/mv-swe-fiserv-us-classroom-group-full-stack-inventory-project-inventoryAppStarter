import { React, useState, useEffect } from "react";
import LoginForm from "./LoginForm";

export default function NavBar({ user, setUser }) {
  const [viewLoginForm, setViewLoginForm] = useState(false);
  return (
    <>
      <nav>
        {user ? (
          <>
            <p>Welcome {user.username}</p>
            {/* Add Logic to Display Cart */}
            <p>View Cart</p>
            <button onClick={() => setUser(null)}>Log Out</button>
          </>
        ) : (
          <button onClick={() => setViewLoginForm(!viewLoginForm)}>{viewLoginForm ? "Cancel" : "Login"}</button>
        )}
        {viewLoginForm ? (
            <LoginForm setUser={setUser} setViewLoginForm={setViewLoginForm} />
        ) : null}
      </nav>
    </>
  );
}
