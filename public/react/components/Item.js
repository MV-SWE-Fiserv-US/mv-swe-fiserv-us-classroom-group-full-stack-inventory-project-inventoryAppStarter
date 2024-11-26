import React from "react";

export const Item = ({ item }) => {
  return (
    <div className="item flex flex-col items-center shadow-2xl m-4 p-4 rounded">
      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
      <img
        src={item.image}
        alt={item.name}
        className="w-200 h-200 object-cover mb-4"
      />
      <p className="mb-1">Price: ${item.price}</p>
      <p className="mb-1 text-center">{item.description}</p>
      <p className="mb-1">Category: {item.category}</p>
    </div>
  );
};
