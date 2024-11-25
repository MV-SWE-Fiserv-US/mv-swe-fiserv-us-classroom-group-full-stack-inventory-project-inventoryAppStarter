import React from 'react'

const ItemsList = ({ items }) => {
  return (
    <>
		{
			items.map((sauce, idx) => {
				// return <Sauce sauce={sauce} key={idx} />
			})
		}
	</>
  )
}

export default ItemsList