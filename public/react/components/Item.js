import { React, useState, useEffect } from "react";
import apiURL from "../api";
import "./item.css";

export const Item = (props) => {

  const [viewUpdateForm, setViewUpdateForm] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({
    name: props.item.name,
    description: props.item.description,
    price: props.item.price,
    category: props.item.category,
    image: props.item.image,
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
      const response = await fetch(`${apiURL}/items/${props.item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });
      const data = await response.json();
      props.setItem(data);
      setViewUpdateForm(false);
      props.setRefresh((prev) => !prev);
    } catch (err) {
      console.log("Error updating item:", err);
    }
  }

  return < div className='Itemcontainer'>

    <div className='row'>
      <div className='col-3 item'>
        <button className="itemButton">{props.item.name}</button>
      </div>
      <div className='col-4 item'>
        <p className="itemDescription">{props.item.description}</p>
      </div>
      <div className='col-1 item'>

        <p>{props.item.price}</p>
      </div>
      <div className='col-1 item'>

        <p>{props.item.category}</p>
      </div>
      <div className='col-3 image item' >
        <img src={props.item.image} alt={props.item.name} />

      </div>
    </div>
    <>
      {viewUpdateForm ? (
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
      ) : null}
    </>
  </div>

};