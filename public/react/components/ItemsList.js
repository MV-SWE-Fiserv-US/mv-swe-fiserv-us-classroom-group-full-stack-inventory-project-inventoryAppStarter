import React from "react";
import { Item } from "./Item";

export const ItemsList = ({ items, setItemId, setSelectItem, setItem }) => {
  function handleClick(item) {
    setSelectItem(true);
    setItemId(item.id);
    setItem(item);
  }
  return (
    <>
      {items.map((item) => {
        return (
          <div onClick={() => handleClick(item)}>
            <Item item={item} key={item.id} />{" "}
          </div>
        );
      })}
    </>
  );
};
