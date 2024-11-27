import { React, useState} from "react";
import apiURL from "../api";

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

  return (
    <>
      <h1>{props.item.name}</h1>
      <p>{props.item.description}</p>
      <p>{props.item.price}</p>
      <p>{props.item.category}</p>
      <img src={props.item.image} alt={props.item.name} />
      {props.selectItem ? (
        <>
          <button onClick={() => props.setSelectItem(false)}>Back</button>
          <button onClick={() => setViewUpdateForm(!viewUpdateForm)}>
            {viewUpdateForm ? "Cancel" : "Update"}
          </button>
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
      ) : null}
    </>
  );
};
