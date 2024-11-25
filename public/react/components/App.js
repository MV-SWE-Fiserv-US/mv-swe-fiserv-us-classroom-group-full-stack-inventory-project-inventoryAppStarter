import React, { useState, useEffect } from 'react'

// import and prepend the api url to any fetch calls
import apiURL from '../api'
import ItemCard from './ItemCard/ItemCard'
import ItemDescription from './ItemDescription/ItemDescription'

export const App = () => {

	const [items, setItems] = useState([])
	const [singleItem, setSingleItem] = useState(null)

	async function fetchItems(){
		try {
			const response = await fetch(`${apiURL}/items`)
			const itemsData = await response.json()
			
			setItems(itemsData)
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchItems()
	}, [singleItem])

	return (
		<main className="h-screen w-screen">	
      		<h1 style={{ fontSize : '5vw', justifySelf : 'center', paddingBottom : '40px' }} >Vaultry</h1>
			{singleItem ? <ItemDescription singleItem={singleItem} /> : <ItemCard items={items} setSingleItem={setSingleItem} />} {/* // Change tis turnary to show the detail page once its created, when singleItem state is updated  */}
		</main>
	)
}