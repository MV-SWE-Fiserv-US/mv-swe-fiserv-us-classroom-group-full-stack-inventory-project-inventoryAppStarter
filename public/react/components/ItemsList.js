import React from 'react';
import { Items } from './Items';

export const ItemssList = ({items}) => {
	return <>
		{
			items.map((items, idx) => {
				return <Items items={items} key={idx} />
			})
		}
	</>
} 
 