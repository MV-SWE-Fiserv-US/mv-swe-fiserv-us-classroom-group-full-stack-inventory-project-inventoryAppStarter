import React, { useState, useEffect } from "react";
import apiURL from "../api";

export default function Cart({ user }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUsersItems();
    } else {
      console.log("User is not defined");
    }
  }, [user]);

  async function fetchUsersItems() {
    try {
      const response = await fetch(`${apiURL}/users/${user.id}/items`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const text = await response.text();
      const userItems = text ? JSON.parse(text) : [];

      setItems(userItems);
    } catch (error) {
      console.error(
        "An error occurred while fetching the user's items:",
        error
      );
    }
  }

  function getTotal() {
    return items.reduce((acc, current) => acc + current.price, 0);
  }

  return (
    <div>
      <h1>{user ? `${user.username}'s Cart` : "Log in to start shopping"}</h1>
      {items.length > 0 && user
        ? items.map((item) => (
            <>
              <div className="Itemcontainer">
                <div className="row">
                  <div className="col-3 item">
                    <button className="itemButton">{item.name}</button>
                  </div>
                  <div className="col-4 item">
                    <p>{item.description}</p>
                  </div>
                  <div className="col-1 item">
                    <p>{item.price}</p>
                  </div>
                  <div className="col-1 item">
                    <p>{item.category}</p>
                  </div>
                  <div className="col-3 image item">
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>
              </div>
            </>
          ))
        : "You haven't added any items to your Cart yet!"}
      <div>{user ? <h3>Total: ${getTotal()}</h3> : ""}</div>
    </div>
  );
}
