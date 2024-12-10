// AddItemForm.js
import React, { useState } from 'react';
import apiURL from '../api';
import './AddItemForm.css';

export const AddItemForm = ({ setItems }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    category:'',
    image:'',
  });

  // Handle changes in form input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to add a new item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiURL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      
      const data = await response.json();
      setItems(prevItems => [...prevItems, data]);  // Update items list with the new item
      setNewItem({ name: '', description: '', price: ''  ,description:'',category:'',image:''});  // Reset form inputs
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <form className='itemForm' onSubmit={handleSubmit}>
      <h3 className='AddItemText'>Add New Item</h3>
      <div className='FormFont'>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            className='formInput'
            required
          />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleInputChange}
            className='formInput'
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newItem.description}
            onChange={handleInputChange}
            className='formInput'
            required
          />
        </label>
      </div>
      <div>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={newItem.category}
            onChange={handleInputChange}
            className='formInput'
            required
          />
        </label>
      </div>
      <div>
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={newItem.image}
            onChange={handleInputChange}
            className='formInput'
            required
          />
        </label>
      </div>
      <button className='AddButton' type="submit">Add Item</button>
      </div>
    </form>
  );
};
