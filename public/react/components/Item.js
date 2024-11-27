import React from "react";

export const Item = ({ item }) => {
  return (
    <div className="item flex flex-col items-center shadow-2xl m-4 p-6 rounded ">
      <h3 className="text-2xl font-semibold mb-4">{item.name}</h3>
      <img
        src={item.image}
        alt={item.name}
        className="w-200 h-200 object-cover mb-6 rounded"
      />
      <div className="w-full">
        <div className="mb-3">
          <span className="font-medium ">Price:</span>
          <span className="ml-2 ">${item.price}</span>
        </div>
        <div className="mb-3">
          <span className="font-medium ">Description:</span>
          <p className="ml-2 ">{item.description}</p>
        </div>
        <div>
          <span className="font-medium ">Category:</span>
          <span className="ml-2 ">{item.category}</span>
        </div>
      </div>
    </div>
  );
};
