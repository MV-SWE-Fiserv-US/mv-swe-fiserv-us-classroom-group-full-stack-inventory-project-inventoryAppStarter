import { React, useState } from "react";
import LoginForm from "./LoginForm";
import "./NavBar.css";
import Cart from "./Cart";

export default function NavBar({
  user,
  setUser,
  viewCart,
  setViewCart,
  setSelectItem,
}) {
  const [viewLoginForm, setViewLoginForm] = useState(false);

  function handleViewCart() {
    setViewCart(!viewCart);
    setSelectItem(false);
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg nav-pills flex-column flex-sm-row">
        {user ? (
          <>
            <p>Welcome {user.username}</p>

            <button onClick={handleViewCart}>
              {viewCart ? "Back to Items" : "View Cart"}
            </button>
            <button onClick={() => setUser(null)}>Log Out</button>
          </>
        ) : (
          <button onClick={() => setViewLoginForm(!viewLoginForm)}>
            {viewLoginForm ? "Cancel" : "Login"}
          </button>
        )}
        {viewLoginForm ? (
          <LoginForm setUser={setUser} setViewLoginForm={setViewLoginForm} />
        ) : null}
        <a
          className="navbar-brand flex-fill text-center nav-link"
          href="#"
          style={{ color: "white", fontSize: "2em" }}
        >
          Thread & Trend
        </a>
      </nav>
    </>
  );
}
