import React from "react";
import { Item } from "./Item";

export const ItemsList = ({ items, onSelectItem }) => {
  return (
    <div className="items-list">
      {items.map((item) => (
        <div key={item.id} onClick={() => onSelectItem(item)}>
          <Item item={item} />
        </div>
      ))}
    </div>
  );
};
