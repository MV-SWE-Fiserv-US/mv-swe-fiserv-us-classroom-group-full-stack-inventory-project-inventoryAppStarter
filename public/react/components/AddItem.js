import React, { useState } from "react";

export const AddItem = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Call the onAdd callback passed from the parent component (App.js)
    await onAdd(formData); // Trigger the callback to add the item

    
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h3>Create a New Item</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleInputChange}
      />
      <button type="submit">Add Item</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
