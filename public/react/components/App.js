import React, { useState, useEffect } from 'react';
import  {ItemsList}  from './ItemsList';
import {Item}  from './Item';


// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {
	const [selectItem, setSelectItem] = useState(false);
	const [items, setItems] = useState([]);
	const [item, setItem] = useState({});
	const [itemId, setItemId] = useState(null);
	const [refresh, setRefresh] = useState(false);

	
	async function fetchItem(){
		try {
			console.log('item id is:', itemId);
			const response = await fetch(`${apiURL}/items/${itemId}`);
			const itemData = await response.json();
			setItem(itemData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	} 
	
	async function fetchItems(){
		try {
			const response = await fetch(`${apiURL}/items`);
			const itemsData = await response.json();
			console.log(itemsData);
			
			setItems(itemsData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	} 

	const handleDeleteItem = async() => {
		try {
			const response = await fetch(`${apiURL}/items/${itemId}`, {
				method: 'DELETE'
			});
		if (response.status === 204) {
		 	await fetchItems();
			setSelectItem(false);
		}
	} catch (err) {
		console.log("Oh no an error! ", err) 
	}}

	useEffect(() => {
		if (selectItem) {
			fetchItem();
		} else {
			fetchItems();
		}
		
	}, [selectItem, itemId, refresh]);
	

	return (
		<main>
			{selectItem ? <Item item={item} setSelectItem ={setSelectItem} selectItem={selectItem} setItem={setItem} setRefresh={setRefresh}/> : <>
      	<h1>ITEMS</h1>
			<ItemsList setItemId ={setItemId} setSelectItem= {setSelectItem} items={items} setItem={setItem}/> </> }
			<button onClick={() => handleDeleteItem(itemId)}>Delete</button>
		</main>
	)
}