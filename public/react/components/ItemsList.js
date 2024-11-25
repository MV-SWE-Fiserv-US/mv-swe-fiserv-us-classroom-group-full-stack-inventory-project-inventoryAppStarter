import React from 'react'
import Item from './Item'

const ItemsList = ({ items, setSingleItem }) => {
  return (
    <>
		{
			items.map((item, idx) => {
				return <Item item={item} key={idx} setSingleItem={ setSingleItem }/>
			})
		}
	</>
  )
}

export default ItemsList