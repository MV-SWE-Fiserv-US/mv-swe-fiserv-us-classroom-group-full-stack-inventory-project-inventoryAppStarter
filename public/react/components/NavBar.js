import { React, useState } from "react";
import LoginForm from "./LoginForm";
import "./NavBar.css";


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
          <div className="welcomebar">
            <p>Welcome {user.username}</p>
            </div>
            <button className="navbar-brand flex-fill text-center nav-link" href="#" style={{ color: 'white', fontSize: '2em' }}>Thread & Trend</button>
            <div className="logoutbutton">
            <button className= "ViewLogButton" onClick={handleViewCart}>{viewCart ? "Back to Items" : "View Cart"}</button>
            <button className= "ViewLogButton" onClick={() => setUser(null)}>Log Out</button>
            </div>
          </>
        ) : (
          <>
          <a className="navbar-brand flex-fill text-center nav-link" href="#" style={{ color: 'white', fontSize: '2em' }}>Thread & Trend</a>
          <button className="buttonLogin" onClick={() => setViewLoginForm(!viewLoginForm)}>{viewLoginForm ? "Cancel" : "Login"}</button>
          </>
        )
      }
        {viewLoginForm ? (
          <LoginForm setUser={setUser} setViewLoginForm={setViewLoginForm} />
        ) : null}
      </nav>
    </>
  );
}
