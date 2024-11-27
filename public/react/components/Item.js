import { React, useState } from "react";
import UpdateForm from "./UpdateForm";
import apiURL from "../api";
import "./item.css";

export const Item = ({ item, setItem, setSelectItem, setRefresh, viewUpdateForm, setViewUpdateForm }) => {
  // const [updatedItem, setUpdatedItem] = useState({
  //   name: props.item.name,
  //   description: props.item.description,
  //   price: props.item.price,
  //   category: props.item.category,
  //   image: props.item.image,
  // });

  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setUpdatedItem((prevItem) => ({
  //     ...prevItem,
  //     [name]: value,
  //   }));
  // }

  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch(`${apiURL}/items/${props.item.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedItem),
  //     });
  //     const data = await response.json();
  //     props.setItem(data);
  //     setViewUpdateForm(false);
  //     props.setRefresh((prev) => !prev);
  //   } catch (err) {
  //     console.log("Error updating item:", err);
  //   }
  // }

  return (
    <div className="Itemcontainer">
      <div className="row">
        <div className="col-3 item">
          <button className="itemButton">{item.name}</button>
        </div>
        <div className="col-4 item">
          <p className="itemDescription">{item.description}</p>
        </div>
        <div className="col-1 item">
          <p>{item.price}</p>
        </div>
        <div className="col-1 item">
          <p>{item.category}</p>
        </div>
        <div className="col-3 image item">
          <img src={item.image} alt={item.name} />
        </div>
      </div>
      <div>
        {setSelectItem ? (
          <>
            <button onClick={() => setSelectItem(false)}>Back</button>
            <button
              onClick={() => setViewUpdateForm((prev) => !prev)}
            >
              {viewUpdateForm ? "Cancel" : "Update"}
            </button>
          </>
        ) : (
          ""
        )}

        {viewUpdateForm && (
          <UpdateForm
            item={item}
            setItem={setItem}
            setSelectItem={setSelectItem}
            setViewUpdateForm={setViewUpdateForm}
            setRefresh={setRefresh}
          />
        )}
      </div>
    </div>
  );
};
