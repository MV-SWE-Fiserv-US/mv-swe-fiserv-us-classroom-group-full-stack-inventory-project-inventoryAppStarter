import React, { useState } from "react";

export const EditItem = ({ item, onUpdateItem, onCancel, className }) => {
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
    <form
      onSubmit={handleSubmit}
      className={`p-6 rounded shadow-md w-full max-w-md ${className}`}
    >
      <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
      <label className="block mb-4">
        <span className="mb-1">Name:</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full p-2 rounded border focus:outline-none"
          required
        />
      </label>
      <label className="block mb-4">
        <span className="mb-1">Price:</span>
        <input
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full p-2 rounded border focus:outline-none"
          required
        />
      </label>
      <label className="block mb-4">
        <span className="mb-1">Description:</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full p-2 rounded border focus:outline-none"
          required
        />
      </label>
      <label className="block mb-4">
        <span className="mb-1">Category:</span>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full p-2 rounded border focus:outline-none"
          required
        />
      </label>
      <label className="block mb-6">
        <span className="mb-1">Image URL:</span>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="mt-1 block w-full p-2 rounded border focus:outline-none"
        />
      </label>
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded transition"
        >
          Update Item
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-red-600 text-white rounded transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
