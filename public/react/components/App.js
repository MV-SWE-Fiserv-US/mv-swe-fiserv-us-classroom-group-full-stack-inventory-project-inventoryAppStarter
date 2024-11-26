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
	useEffect(() => {
		if (selectItem) {
			fetchItem();
		} else {
			fetchItems();
		}
		
	}, [selectItem, itemId]);
	

	return (
		<main>
			{selectItem ? <Item item={item} setSelectItem ={setSelectItem} /> : <>
      	<h1>ITEMS ? </h1>
			<h2>ALL THINGS ITEMS</h2>
			<ItemsList setItemId ={setItemId} setSelectItem= {setSelectItem} items={items} setItem={setItem}/> </> }
		</main>
	)
}