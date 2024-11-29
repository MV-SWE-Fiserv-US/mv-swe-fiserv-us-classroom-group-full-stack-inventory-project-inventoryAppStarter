import { React, useState } from "react";
import UpdateForm from "./UpdateForm";
import apiURL from "../api";
import "./item.css";

export const Item = ({
  item,
  setItem,
  setSelectItem,
  selectItem,
  setRefresh,
  viewUpdateForm,
  setViewUpdateForm,
  viewCart,
  setViewCart,
  setAddedItem,
  user,
}) => {

  async function handleAddToCart() {
    console.log(user.id, item.id);
    try {
    
      const response = await fetch(`${apiURL}/users/${user.id}/addToCart/${item.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(
        "An error occurred while adding the item to the cart:",
        error
      );
    }
  }

  return (
    <div className="Itemcontainer">
      <div className="row">
        <div  className="col-3 item">
          <button  className="itemButton">{item.name}</button>
        </div>
        <div className="col-4 item">
        <p>{item.description}</p>
       </div>
        <div className="col-1 item">
          <p>{item.price}</p>
        </div>
        <div className="col-1 item">
          <p>{item.category}</p>
        </div>
        <div className="col-3 image item">
          <img src={item.image} alt={item.name} />
          {selectItem  && user ? (
            <div>
              <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div>
        {setSelectItem ? (
          <>
            <button onClick={() => setSelectItem(false)}>Back</button>
            <button onClick={() => setViewUpdateForm((prev) => !prev)}>
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
