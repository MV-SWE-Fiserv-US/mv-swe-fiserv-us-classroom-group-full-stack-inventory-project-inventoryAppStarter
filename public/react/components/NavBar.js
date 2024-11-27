import { React, useState } from "react";
import LoginForm from "./LoginForm";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  const [viewLoginForm, setViewLoginForm] = useState(false);
  return (
    <>
      <nav className="navbar navbar-expand-lg nav-pills flex-column flex-sm-row">
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
        <a className="navbar-brand flex-fill text-center nav-link" href="#" style={{ color: 'white', fontSize: '2em' }}>Thread & Trend</a>
      </nav>
    </>
  );
}
