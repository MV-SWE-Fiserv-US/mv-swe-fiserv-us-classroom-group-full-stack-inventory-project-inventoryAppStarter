import React, { useState, useEffect } from "react"

// import and prepend the api url to any fetch calls
import apiURL from "../api"
import ItemCard from "./ItemCard/ItemCard"

export default function App() {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState(null)
  const [categories, setCategories] = useState([]);

  async function fetchItems() {
    try {
      const response = await fetch(`${apiURL}/items`)
      const itemsData = await response.json()

      const uniqueCategories = Array.from(
        new Set(itemsData.map((item) => item.category))
      )
      setCategories(uniqueCategories)

      setItems(itemsData)
    } catch (err) {
      console.log("Oh no an error! ", err)
    }
  }

  const handleCategory = (e) => {
    e.preventDefault()
    const category = e.target.value
    if (category === "All") {
      setFilteredItems(null)
      fetchItems()
    } else {
      const filterItems = items.filter((item) => item.category === category)
      setFilteredItems(filterItems)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])


  const categorySection = (
    <section className="bg-zinc-300 flex flex-col items-end pr-8 py-2">
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
  )


  return (
    <main className="h-full w-screen bg-zinc-300">
      {categorySection}
      {<hr className="border-t border-gray-400 my-4"></hr>}
      <ItemCard items={filteredItems ? filteredItems : items} />
    </main>
  )
}
