import React from 'react'

const ItemDetails = ({ singleItem }) => {
  return (
    <article>
        <h2>{singleItem.name}</h2>
        <img src={singleItem.image} alt={singleItem.name} />
        <h3>{singleItem.price}</h3>
        <p>{singleItem.description}</p>
    </article>
  )
}

export default ItemDetails