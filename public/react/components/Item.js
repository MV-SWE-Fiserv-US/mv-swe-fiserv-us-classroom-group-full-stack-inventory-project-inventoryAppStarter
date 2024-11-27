import { React, useState } from "react";
import UpdateForm from "./UpdateForm";
import apiURL from "../api";
import "./item.css";

export const Item = ({ item, setItem, setSelectItem, setRefresh, viewUpdateForm, setViewUpdateForm }) => {
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
