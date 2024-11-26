import React, { useState, useEffect } from "react";
import { ItemsList } from "./ItemsList";
import { Item } from "./Item";
import { AddItemForm } from "./AddItemForm";
import { Headers } from "./Headers";

// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
  const [selectItem, setSelectItem] = useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [itemId, setItemId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function fetchItem() {
    try {
      console.log("item id is:", itemId);
      const response = await fetch(`${apiURL}/items/${itemId}`);
      const itemData = await response.json();
      setItem(itemData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  async function fetchItems() {
    try {
      const response = await fetch(`${apiURL}/items`);
      const itemsData = await response.json();
      console.log(itemsData);

      setItems(itemsData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  const handleDeleteItem = async () => {
    try {
      const response = await fetch(`${apiURL}/items/${itemId}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        setSelectItem(false);
      }
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  };

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  useEffect(() => {
    if (selectItem) {
      fetchItem();
    } else {
      fetchItems();
    }
  }, [selectItem, itemId, refresh]);

  return (
    <main>
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
          <Headers/>
          <ItemsList
            setItemId={setItemId}
            setSelectItem={setSelectItem}
            items={items}
            setItem={setItem}
          />{" "}
        </>
      )}
      <button onClick={toggleForm}>{showForm ? "Cancel" : "Add Item"}</button>

      {/* Render AddItemForm if showForm is true */}
      {showForm && <AddItemForm setItems={setItems} />}
    </main>
  );
};
