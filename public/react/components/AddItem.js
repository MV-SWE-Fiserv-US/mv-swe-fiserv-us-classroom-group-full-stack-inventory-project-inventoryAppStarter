import React, { useState } from "react";

export const AddItem = ({ onAdd, onCancel, className }) => {
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
    await onAdd(formData);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`p-6 rounded shadow-md w-full max-w-md ${className}`}
    >
      <h3 className="text-2xl font-bold mb-4">Create a New Item</h3>
      <label className="block mb-4">
        <span className="mb-1">Name:</span>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full p-2 rounded border focus:outline-none"
        />
      </label>
      <label className="block mb-4">
        <span className="mb-1">Price:</span>
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full p-2 rounded border focus:outline-none"
        />
      </label>
      <label className="block mb-4">
        <span className="mb-1">Description:</span>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full p-2 rounded border focus:outline-none"
        />
      </label>
      <label className="block mb-4">
        <span className="mb-1">Category:</span>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full p-2 rounded border focus:outline-none"
        />
      </label>
      <label className="block mb-6">
        <span className="mb-1">Image URL:</span>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 rounded border focus:outline-none"
        />
      </label>
      <div className="flex justify-end space-x-6">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded transition"
        >
          Add Item
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
