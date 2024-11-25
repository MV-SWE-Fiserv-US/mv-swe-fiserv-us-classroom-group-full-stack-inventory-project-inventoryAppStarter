import React from 'react'

const Item = ({ item }) => {
  return (
    <div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>{item.price}</p>
        <img src={item.image} alt={item.name} />
    </div>
  )
}

export default Item