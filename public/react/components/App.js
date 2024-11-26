import React, { useState, useEffect } from "react";

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import Navbar from "./Navbar/Navbar";
import ItemCard from "./ItemCard/ItemCard";
import ItemDescription from "./ItemDescription/ItemDescription";

export const App = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);
  const [categories, setCategories] = useState([]);
  const [singleItem, setSingleItem] = useState(null);

  async function fetchItems() {
    try {
      const response = await fetch(`${apiURL}/items`);
      const itemsData = await response.json();

      const uniqueCategories = Array.from(
        new Set(itemsData.map((item) => item.category))
      );
      setCategories(uniqueCategories);

      setItems(itemsData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  const handleCategory = (e) => {
    e.preventDefault();
    const category = e.target.value;
    if (category === "All") {
      setFilteredItems(null);
      fetchItems();
    } else {
      const filterItems = items.filter((item) => item.category === category);
      setFilteredItems(filterItems);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [singleItem]);

  return (
    <main className="h-screen w-screen">
      <Navbar />
      <label htmlFor="category">Category</label>
      <select onChange={handleCategory}>
        <option value="All">All</option>
        {categories.map((item, id) => (
          <option key={id} value={item}>
            {item}
          </option>
        ))}
      </select>

      {singleItem ? (
        <ItemDescription singleItem={singleItem} setSingleItem={setSingleItem} />
      ) : (
        <ItemCard items={filteredItems ? filteredItems : items} setSingleItem={setSingleItem} />
      )}
    </main>
  );
};
