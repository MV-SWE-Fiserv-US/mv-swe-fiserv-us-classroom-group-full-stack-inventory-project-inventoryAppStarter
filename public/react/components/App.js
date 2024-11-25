import React, { useState, useEffect } from 'react';
import  {ItemsList}  from './ItemsList';


// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {
	const [selectItem, setSelectItem] = useState(null);
	const [items, setItems] = useState([]);
	
	async function fetchItem(){
		try {
			const response = await fetch(`${apiURL}/items/:id`);
			const itemsData = await response.json();
			
			setSelectItem(itemsData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	} 
	
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
		fetchItem();
	}, [])
	useEffect(() => {
		fetchItems();
	}, []);

	return (
		<main>
			<h1> HELOOO</h1>
      	<h1>ITEMS</h1>
			<h2>ALL THINGS ITEMS</h2>
			<ItemsList items={items} />
		</main>
	)
}