import React from 'react';

export const Item = (props) => {
console.log(props.item);
  return <>
    <button>{props.item.name}</button>
    <p>{props.item.description}</p>
    <p>{props.item.price}</p>
    <p>{props.item.category}</p>
    <img src={props.item.image} alt={props.item.name} />
    <button onClick={() => props.setSelectItem(false)}>Back</button>
  </>
} 

	 