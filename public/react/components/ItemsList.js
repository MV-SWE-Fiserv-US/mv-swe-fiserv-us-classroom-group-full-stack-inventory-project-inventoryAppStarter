import React from 'react';
import  {Item}  from './Item';

export const ItemsList = ({items, setItemId, setSelectItem, setItem}) => {

	function handleClick(item){
		setSelectItem(true)
		setItemId(item.id);
		setItem(item);
	}
	
	return <>
		{
			items.map((item, idx) => {
				console.log(item);
				return <button onClick={() => handleClick(item)}><Item item={item} key={idx} /></button>
			})
		}
	</>
} 
 
