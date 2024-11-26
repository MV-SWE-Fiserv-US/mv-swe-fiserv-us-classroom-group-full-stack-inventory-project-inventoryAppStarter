import React from "react";

export const Item = ({ item }) => {
  return (
    <div className="item">
      <h3 className="description">{item.name}</h3>
      <img src={item.image} alt={item.name}className="itemImg"/>
    
        <p className="description">Price: ${item.price}</p>
        <p className="description">{item.description}</p>
   
    </div>
  );
};
