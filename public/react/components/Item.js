import React from 'react'

const Item = ({ item, setSingleItem }) => {
  return (
    <div onClick={ e => setSingleItem(item) }>
        <h3>{item.name}</h3>
        <p>${item.price}</p>
        <img src={item.image} alt={item.name} />
    </div>
  )
}

export default Item