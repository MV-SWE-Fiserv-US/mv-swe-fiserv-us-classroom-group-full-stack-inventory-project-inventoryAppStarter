import React from 'react';
import  {Items}  from './Items';

export const ItemsList = ({items}) => {

	
	return <>
		{
			items.map((item, idx) => {
				return <Items items={items} key={idx} />
			})
		}
	</>
} 
 
