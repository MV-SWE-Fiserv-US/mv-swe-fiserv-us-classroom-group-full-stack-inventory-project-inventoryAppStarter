import React from "react";

export const DeleteButton = ({ deleteItem, item, className }) => {
  return (
    <button onClick={() => deleteItem(item.id)} className={className}>
      Delete
    </button>
  );
};
