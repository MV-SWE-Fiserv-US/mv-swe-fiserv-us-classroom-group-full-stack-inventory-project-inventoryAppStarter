import React from 'react';
import "./Item.css";

export const Item = (props) => {
console.log(props.item);
  return < div className='container, mx-auto'>
    
    <div className='row'>
      <div className='col-3'>
    <button>{props.item.name}</button>
      </div>
      <div className='col-3'>
    <p>{props.item.description}</p>
      </div>
      <div className='col-1'>

    <p>{props.item.price}</p>
      </div>
      <div className='col-1'>

    <p>{props.item.category}</p>
      </div>
      <div className='col-3 image' >
    <img src={props.item.image} alt={props.item.name} />

      </div>
      <div className='col-1'>

    <button onClick={() => props.setSelectItem(false)}>Back</button>
      </div>
    </div>
    
  </div>
}