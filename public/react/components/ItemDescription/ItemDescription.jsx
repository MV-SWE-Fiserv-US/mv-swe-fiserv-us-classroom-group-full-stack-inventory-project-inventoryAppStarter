import React, { useState } from "react";
import UpdateItem from "../Forms/UpdateItemForm/UpdateItem";

export default function ItemDescription({ singleItem, setSingleItem }) {
  const [btn, setBtn] = useState(false);

  function onClick() {
    setBtn(!btn);
  }

  function generateStars(num) {
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(
        <svg
          key={i}
          className="w-4 h-4 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
    for (let i = num; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className="w-4 h-4 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
    return stars;
  }

  const num = Math.floor(Math.random() * 6);

  return (
    <>
      <section className="max-w-4xl h-[70%] mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200 flex">
        <div className="w-1/2 h-full flex flex-col p-4 items-center justify-center">
          <div className="w-full">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              type="button"
              onClick={() => setSingleItem(null)}
            >
              Back to Shop
            </button>
          </div>
          <img
            src={singleItem.image}
            alt={singleItem.name}
            className="h-full w-1/2 object-contain"
          />
        </div>
        <div className="p-4 flex flex-col justify-around flex-wrap w-1/2">
          <h2 className="text-xl font-semibold text-gray-800">
            {singleItem.name}
            <div className="flex items-center space-x-1 rtl:space-x-reverse bg-white">
              {generateStars(num)}
            </div>
          </h2>
          <p className="text-gray-600 mt-2">{singleItem.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">
              ${singleItem.price.toFixed(2)}
            </span>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-around m-12">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onClick}
        >
          Update Item
        </button>
      </div>
      {btn ? (
        <UpdateItem item={singleItem} setSingleItem={setSingleItem} />
      ) : (
        ""
      )}
    </>
  );
}
