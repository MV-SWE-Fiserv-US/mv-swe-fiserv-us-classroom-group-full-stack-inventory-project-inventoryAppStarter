import React, { useState, useEffect } from "react";
import { ItemsList } from "./ItemsList";
import { Item } from "./Item";
import apiURL from "../api";

export const App = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // New state

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

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  return (
    <main>
      <h1>Item Store</h1>
      {selectedItem ? (
        <div>
          <button onClick={handleBack}>Back to Items</button>
          <Item item={selectedItem} />
        </div>
      ) : (
        <>
          <h2>All Items</h2>
          <ItemsList items={items} onSelectItem={handleSelectItem} />
        </>
      )}
    </main>
  );
};
