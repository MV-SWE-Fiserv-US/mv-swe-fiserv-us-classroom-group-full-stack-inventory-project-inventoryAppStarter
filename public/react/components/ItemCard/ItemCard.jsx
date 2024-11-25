import React from 'react'
import './ItemCard.css'

export default function ItemCard({ items }) {
    return (
        <div className="item-container">
            {items.map((item) => (
            <div className="item-card" key={item.id}>
                <h2>{item.name}</h2>
                <p><span style={{fontWeight: 'bold'}} >Category:</span> {item.category}</p>
                <p><span style={{fontWeight: 'bold'}} >Price:</span> ${item.price}</p>
                <img src={item.image} alt={item.name} />
            </div>
            ))}
        </div>
    );
}