import React from "react";

export const DeleteButton = ({deleteItem, item }) => {
  
  return (
    <button onClick={()=>deleteItem(item.id)}>
      Delete
    </button>
  );
};

