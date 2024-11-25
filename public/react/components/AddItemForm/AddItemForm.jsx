import React, { useState } from "react";
import apiURL from "../../api";

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    imageUrl: "",
  });

  async function postItem(item) {
    try {
        const response = await fetch(`${apiURL}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        if(!response.ok) {
            throw new Error("Item could not be posted..")
        }
    } catch(error) {
        console.log("Oh no an error! ", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postItem(formData);
  };

  return <form className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200" onSubmit={handleSubmit}>
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Inventory Item</h2>
    
      <div className="mb-4">
        <label htmlFor="name" className="text-gray-700 font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter item name"
          required
        />
      </div>

    
      <div className="mb-4">
        <label htmlFor="description" className="text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter item description"
          rows="4"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="text-gray-700 font-medium mb-2">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter item category"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="text-gray-700 font-medium mb-2">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter item price"
          step="0.01"
          required
        />
      </div>

     
      <div className="mb-6">
        <label htmlFor="imageUrl" className="text-gray-700 font-medium mb-2">
          Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter image URL"
          required
        />
      </div>

      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Item
      </button>
  </form>;
};

export default AddItemForm;
