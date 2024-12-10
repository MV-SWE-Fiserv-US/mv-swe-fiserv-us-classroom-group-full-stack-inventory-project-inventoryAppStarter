import React, { useState, useEffect } from "react";
import { ItemsList } from "./ItemsList";
import { Item } from "./Item";
import { AddItemForm } from "./AddItemForm";
import { Headers } from "./Headers";
import "./App.css";
import NavBar from "./NavBar";
import Cart from "./Cart";

// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
  const [selectItem, setSelectItem] = useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [itemId, setItemId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
  const [viewUpdateForm, setViewUpdateForm] = useState(false);
  const [viewCart, setViewCart] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  async function fetchItem() {
    try {
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
      setItems(itemsData);
      console.log("view cart is in App");
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
  }, [selectItem, itemId, refresh, viewUpdateForm, viewCart]);

  return (
    <>
      <NavBar
        user={user}
        setUser={setUser}
        viewCart={viewCart}
        setViewCart={setViewCart}
        selectItem={selectItem}
        setSelectItem={setSelectItem}
      />

      <main className="mainContainer">
        <div className="header"></div>
        <div className="content">
          {viewCart ? (
            <>
              <Cart user={user} />
            </>
          ) : selectItem ? (
            <>
              <Item
                item={item}
                setSelectItem={setSelectItem}
                selectItem={selectItem}
                setItem={setItem}
                setRefresh={setRefresh}
                viewUpdateForm={viewUpdateForm}
                setViewUpdateForm={setViewUpdateForm}
                viewCart={viewCart}
                setViewCart={setViewCart}
                setAddedItem={setAddedItem}
                user={user}
              />
              {user ? (
                <button
                  className="buttonThree"
                  onClick={() => handleDeleteItem(itemId)}
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <Headers />
              <div className="itemPadding">
                <ItemsList
                  setItemId={setItemId}
                  setSelectItem={setSelectItem}
                  items={items}
                  setItem={setItem}
                />
              </div>
            </>
          )}
        </div>{" "}
        {viewCart === false && selectItem === false && user ? (
          <button
            className="AddItemCancel"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add Item"}
          </button>
        ) : (
          ""
        )}
        {showForm && user ? <AddItemForm setItems={setItems} /> : ""}
      </main>
    </>
  );
};
