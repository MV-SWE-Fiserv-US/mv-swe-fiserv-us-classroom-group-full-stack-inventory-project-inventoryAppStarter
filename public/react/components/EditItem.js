import React, { useState } from "react";

export const EditItem = ({ item, onUpdateItem, onCancel }) => {
  const [formData, setFormData] = useState({
    name: item.name,
    price: item.price,
    description: item.description,
    category: item.category,
    image: item.image,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdateItem(item.id, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Item</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Item</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
