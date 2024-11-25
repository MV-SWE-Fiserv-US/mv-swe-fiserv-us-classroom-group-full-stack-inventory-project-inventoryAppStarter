import React from 'react';

export const Items = (props) => {

  return <>
    <h3>{props.items.name}</h3>
    <p>{props.items.description}</p>
    <p>{props.items.price}</p>
    <p>{props.items.category}</p>
    <img src={props.items.image} alt={props.items.name} />
  </>
} 
	 