import React, { useState, useEffect } from 'react';
import { SaucesList } from './SaucesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';
import ItemsList from './ItemsList';
import ItemDetails from './ItemDetails';
import ItemCard from './ItemCard/ItemCard'

export const App = () => {

	const [items, setItems] = useState([]);
	const [singleItem, setSingleItem] = useState({
		name: "",
		description: "",
		price: 0,
		image: ""
	});

	async function fetchItems(){
		try {
			const response = await fetch(`${apiURL}/items`);
			const itemsData = await response.json();
			
			setItems(itemsData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchItems();
	}, []);

	return (
		<main>	
      		<h1>Vaultry</h1>
			<ItemCard items={items}/>
		</main>
	)
}