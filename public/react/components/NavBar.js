import { React, useState } from "react";
import LoginForm from "./LoginForm";

export default function NavBar({ user, setUser, viewCart, setViewCart }) {
  const [viewLoginForm, setViewLoginForm] = useState(false);
  return (
    <>
      <nav>
        {user ? (
          <>
            <p>Welcome {user.username}</p>
            <button onClick={() => setViewCart(!viewCart)}>View Cart</button>
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
