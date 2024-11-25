import React, { useState, useEffect } from "react";
import { ItemsList } from "./ItemsList";
import apiURL from "../api";

export const App = () => {
  const [items, setItems] = useState([]);

  async function fetchItems() {
    try {
      const response = await fetch(`${apiURL}/items`);
      const itemsData = await response.json();
      setItems(itemsData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <main>
      <h1>Item Store</h1>
      <h2>All Items</h2>
      <ItemsList items={items} />
    </main>
  );
};
