import React from "react";

export const Item = ({ item }) => {
  return (
    <div className="item">

      <h3>{item.name}</h3>
      <img src={item.image} alt={item.name} />
      <p>Price: ${item.price}</p>
      <p>{item.description}</p>
      <p>Category: {item.category}</p>

    </div>
  );
};
