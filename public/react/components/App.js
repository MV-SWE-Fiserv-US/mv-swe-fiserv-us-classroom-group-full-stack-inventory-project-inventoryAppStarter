import React, { useState, useEffect } from "react";
import { ItemsList } from "./ItemsList";
import { Item } from "./Item";
import { AddItemForm } from "./AddItemForm";
import { SearchItems } from "./SearchItems"; 

// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
  const [selectItem, setSelectItem] = useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [itemId, setItemId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch a single item by ID
  async function fetchItem() {
    setLoading(true); // Start loading
    try {
      console.log("Fetching item with ID:", itemId);
      const response = await fetch(`${apiURL}/items/${itemId}`);
      const itemData = await response.json();
      setItem(itemData);
    } catch (err) {
      console.log("Error fetching item:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  // Fetch all items from the API
  async function fetchItems() {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${apiURL}/items`);
      const itemsData = await response.json();
      setItems(itemsData);
    } catch (err) {
      console.log("Error fetching items:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  // Handle item deletion
  const handleDeleteItem = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${apiURL}/items/${itemId}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        setSelectItem(false);
        setItem({});
        setItemId(null);
        setRefresh((prevState) => !prevState); // Trigger a refresh of the item list
      }
    } catch (err) {
      console.log("Error deleting item:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Toggle the visibility of the AddItemForm
  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  useEffect(() => {
    if (selectItem && itemId) {
      fetchItem();
    } else {
      fetchItems();
    }
  }, [selectItem, itemId, refresh]);

  return (
    <main>
      {loading && <div>Loading...</div>} {/* Simple loading indicator */}
      
      {selectItem ? (
        <>
          <Item
            item={item}
            setSelectItem={setSelectItem}
            selectItem={selectItem}
            setItem={setItem}
            setRefresh={setRefresh}
          />
          <button onClick={() => handleDeleteItem(itemId)}>Delete</button>
        </>
      ) : (
        <>
          <h1>ITEMS</h1>
          
          {/* Adding SearchItems component*/}
          <SearchItems setItems={setItems} />

          <ItemsList
            setItemId={setItemId}
            setSelectItem={setSelectItem}
            items={items}
            setItem={setItem}
          />
        </>
      )}

      <button onClick={toggleForm}>
        {showForm ? "Cancel" : "Add Item"}
      </button>

      {/* Conditionally render AddItemForm */}
      {showForm && <AddItemForm setItems={setItems} />}
    </main>
  );
};
