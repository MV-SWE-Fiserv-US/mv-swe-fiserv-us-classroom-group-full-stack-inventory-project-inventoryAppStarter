import React, { useState, useEffect } from 'react'

// import and prepend the api url to any fetch calls
import apiURL from '../api'
import Navbar from './Navbar/Navbar'
import ItemCard from './ItemCard/ItemCard'
import ItemDescription from './ItemDescription/ItemDescription'


export const App = () => {

	const [items, setItems] = useState([])
	const [filteredItems, setFilteredItems] = useState(null)
	const [categories, setCategories] = useState([])
	const [singleItem, setSingleItem] = useState(null)

	async function fetchItems(){
		try {
			const response = await fetch(`${apiURL}/items`)
			const itemsData = await response.json()
			
			const uniqueCategories = Array.from(new Set(itemsData.map(item => item.category)))
			setCategories(uniqueCategories)
		
			setItems(itemsData)
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}
	
		const handleCategory = (e) => {
			e.preventDefault()
			const category = e.target.value
			if (category === "All") {
				setFilteredItems(null)
				fetchItems()
			} else {
				const filterItems = items.filter(item => item.category === category)
				setFilteredItems(filterItems)
			}
		}
		

	useEffect(() => {
		fetchItems()
	}, [singleItem])
	

	return (
		<main className="h-screen w-screen">	
      		<h1 style={{ fontSize : '5vw', justifySelf : 'center', paddingBottom : '40px' }} >Vaultry</h1>
				<div className='m-20'>
				<label htmlFor="category">Category</label>
				<select onChange={handleCategory}>
					<option value="All">All</option>
					{categories.map((item, id) => (
						<option key={id} value={item}>{item}</option>
					))}
				</select>
			</div>
			{singleItem ? <ItemDescription singleItem={singleItem} /> : filteredItems ? <ItemCard items={filteredItems} setSingleItem={setSingleItem} /> : <ItemCard items={items} setSingleItem={setSingleItem} />} {/* // Change tis turnary to show the detail page once its created, when singleItem state is updated  */}
          <Navbar />
			{singleItem ? <ItemDescription singleItem={singleItem} /> : <ItemCard items={items} setSingleItem={setSingleItem} />} 
		</main>

	)
}