import React from "react";
import { useNavigate } from "react-router";

export default function ItemCard({ items, setSingleItem }) {
  const navigate = useNavigate();

  function handleClick(item) {
    setSingleItem(item);
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

  return (
    <div className="bg-zinc-[#F8F7F5] font-black flex flex-wrap justify-evenly gap-4 mx-auto pb-12 px-4">
      {items.map((item) => {
        const num = Math.floor(Math.random() * 6);
        return (
          <div
            className="bg-white flex flex-col justify-between items-center w-80 h-[600px] rounded-lg border border-slate-200 shadow-lg"
            key={item.id}
            onClick={() => navigate(`/item/${item.id}`)}
          >
            <div className="h-1/2">
              <img
                className="bg-white p-8 rounded-t-lg  h-full aspect-auto object-contain"
                src={item.image}
                alt={item.name}
              />
            </div>
            <div className="px-5 pb-5 bg-white mt-auto rounded-b-lg h-1/2 flex flex-col justify-end w-full">
              <h5 className="bg-white text-lg font-semibold tracking-tight text-black  text-pretty">
                {item.name}
              </h5>

              <div className="flex items-center justify-between mt-2.5 mb-5 bg-white">
                <div className="flex items-center space-x-1 rtl:space-x-reverse bg-white">
                  {generateStars(num)}
                </div>
                <span className=" bg-white text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  {num}.0
                </span>
              </div>
              <div className="flex items-center justify-between bg-white  mt-2 w-full">
                <span className="bg-white text-xl font-bold text-black ">
                  ${item.price.toFixed(2)}
                </span>
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
