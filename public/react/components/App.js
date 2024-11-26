import React, { useState, useEffect } from "react";
import { ItemsList } from "./ItemsList";
import { Item } from "./Item";
import { EditItem } from "./EditItem";
import apiURL from "../api";
import { DeleteButton } from "./DeleteButton";

export const App = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  async function fetchItems() {
    try {
      const response = await fetch(`${apiURL}/items`);
      const itemsData = await response.json();
      setItems(itemsData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  async function deleteItem(itemToDelete) {
    try {
      const response = await fetch(`${apiURL}/items/${itemToDelete}`, {
        method: "DELETE",
      });
      setSelectedItem(null);
    } catch (err) {
      console.log("error deleting item", err);
    }
  }

  useEffect(() => {
    fetchItems();
  }, [selectedItem]); //selectedItem added to dependancy
  //deleteItem sets selectedItem to null which will cause useEffect to trigger to update the list
  //ternary will display list of items when selectedItem is null as well.

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdateItem = async (id, updatedData) => {
    try {
      const response = await fetch(`${apiURL}/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const updatedItem = await response.json();

      setItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? updatedItem : item))
      );
      setSelectedItem(updatedItem);
      setIsEditing(false);
    } catch (err) {
      console.log("Error updating item: ", err);
    }
  };

  return (
    <main>
      <h1>Item Store</h1>
      {selectedItem ? (
        <div>
          <button onClick={handleBack}>Back to Items</button>
          {isEditing ? (
            <EditItem
              item={selectedItem}
              onUpdateItem={handleUpdateItem}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <div>
              <Item item={selectedItem} />
              <button onClick={handleEdit}>Edit Item</button>
              <DeleteButton deleteItem={deleteItem} item={selectedItem} />
            </div>
          )}
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
