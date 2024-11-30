import React, { useState, useEffect } from "react";
import apiURL from "../api";

export default function Cart({ user }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      console.log("User is defined, calling fetchUsersItems");
      fetchUsersItems();
    } else {
      console.log("User is not defined");
    }
  }, [user]);

  async function fetchUsersItems() {
    console.log("fetchUsersItems called");
    try {
      console.log(user.id);
      const response = await fetch(`${apiURL}/users/${user.id}/items`);
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const text = await response.text();
      const userItems = text ? JSON.parse(text) : [];
      console.log("Fetched items:", userItems);
      setItems(userItems);
    } catch (error) {
      console.error(
        "An error occurred while fetching the user's items:",
        error
      );
    }
  }

  return (
    <div>
      <h1>{user ? `${user.username}'s Cart` : "Loading..."}</h1>
      <ul>
        {items.length > 0
          ? items.map((item) => <li key={item.id}>{item.name}</li>)
          : "You haven't added any items to your Cart yet!"}
      </ul>
    </div>
  );
}
