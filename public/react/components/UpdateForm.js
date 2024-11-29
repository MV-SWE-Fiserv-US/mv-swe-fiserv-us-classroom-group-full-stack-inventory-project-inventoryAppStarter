import { React, useState} from "react";
import apiURL from "../api";


export default function UpdateForm({ item, setItem, setSelectItem, setViewUpdateForm }) {
    const [updatedItem, setUpdatedItem] = useState({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
      });
    
    
      function handleChange(e) {
        const { name, value } = e.target;
        setUpdatedItem((prevItem) => ({
          ...prevItem,
          [name]: value,
        }));
      }
    
      async function handleSubmit(e) {
        e.preventDefault();
    
        try {
          const response = await fetch(`${apiURL}/items/${item.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedItem),
          });
          const data = await response.json();
          setItem(data);
          setViewUpdateForm(false);
        } catch (err) {
          console.log("Error updating item:", err);
        }
      }
    return (
        <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={updatedItem.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={updatedItem.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={updatedItem.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={updatedItem.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={updatedItem.image}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
}

