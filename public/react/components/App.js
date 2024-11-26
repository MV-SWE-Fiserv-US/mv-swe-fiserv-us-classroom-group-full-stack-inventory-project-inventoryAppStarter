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
    fetchItems()
  }, [singleItem])


  const categorySection = (
    <section className="my-8 bg-zinc-300 flex flex-col items-end pr-8">
      <h2 className="text-2xl font-semibold mb-4 bg-zinc-300">Browse by Category</h2>
      <div className="flex items-center">
        <label htmlFor="category" className="mr-2 bg-zinc-300">Category:</label>
        <select onChange={handleCategory} className="p-2 border rounded">
          <option value="All">All</option>
          {categories.map((item, id) => (
            <option key={id} value={item}>{item}</option>
          ))}
        </select>
      </div>
    </section>
  );


  return (
    <main className="h-screen w-screen bg-zinc-300">
      <Navbar setSingleItem={setSingleItem} />
      {!singleItem && categorySection}

      {singleItem ? (
        <ItemDescription singleItem={singleItem} setSingleItem={setSingleItem} />
      ) : (
        <ItemCard items={filteredItems ? filteredItems : items} setSingleItem={setSingleItem} />
      )}
    </main>
  );
};
