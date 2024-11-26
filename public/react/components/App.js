import React, { useState, useEffect } from "react";
import { ItemsList } from "./ItemsList";
import { Item } from "./Item";
import { EditItem } from "./EditItem";
import apiURL from "../api";
import { DeleteButton } from "./DeleteButton";
import { AddItem } from "./AddItem";

export const App = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  async function fetchItems() {
    try {
      const response = await fetch(`http://localhost:3000/item`);
      const itemsData = await response.json();
      setItems(itemsData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  async function deleteItem(itemToDelete) {
    try {
      const response = await fetch(
        `http://localhost:3000/item/${itemToDelete}`,
        {
          method: "DELETE",
        }
      );
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

  const handleAddItem = async (newItem) => {
    try {
      // Perform the POST request to add the new item
      const response = await fetch("http://localhost:3000/item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem), // Send the new item as the request body
      });

      if (response.ok) {
        const addedItem = await response.json();
        console.log("Item added successfully:", addedItem);

        // Add the new item to the local state
        setItems((prevItems) => [...prevItems, addedItem]);
        setIsAdding(false); // Close the form after the item is added
      } else {
        console.error("Failed to add item.");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleCancelAddItem = () => {
    setIsAdding(false); // Close the form
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
    <main className="container mx-auto  min-h-screen flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-8 text-center  shadow-md ">
        The Store
      </h1>
      {isAdding ? (
        <AddItem
          onAdd={handleAddItem}
          onCancel={handleCancelAddItem}
          className="bg-white p-4 rounded shadow-md w-full max-w-md"
        />
      ) : selectedItem ? (
        <div className="flex flex-col items-center">
          <button
            onClick={handleBack}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Back to Items
          </button>
          {isEditing ? (
            <EditItem
              item={selectedItem}
              onUpdateItem={handleUpdateItem}
              onCancel={() => setIsEditing(false)}
              className="bg-white p-4 rounded shadow-md w-full max-w-md"
            />
          ) : (
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col items-center">
              <Item item={selectedItem} />
              <button
                onClick={handleEdit}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Edit Item
              </button>
              <DeleteButton
                deleteItem={deleteItem}
                item={selectedItem}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              />
            </div>
          )}
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            All Items
          </h2>
          <div className="space-y-4 p-4">
            <button
              onClick={() => setIsAdding(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Create New Item
            </button>
          </div>
          <ItemsList items={items} onSelectItem={handleSelectItem} />
        </>
      )}
    </main>
  );
};
