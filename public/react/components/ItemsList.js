import React from "react";
import { Item } from "./Item";

export const ItemsList = ({ items, onSelectItem }) => {
  return (
    <div className="items-list w-full max-w-md  space-y-4 p-4 rounded">
      {items.map((item) => (
        <div key={item.id} onClick={() => onSelectItem(item)} className="py-4">
          <Item item={item} />
        </div>
      ))}
    </div>
  );
};
