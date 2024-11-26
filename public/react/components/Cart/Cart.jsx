import React, { useEffect, useState } from "react";
import seedData from "../../../../server/seedData";

const Cart = () => {
  const itemsWithIds = seedData.items.map((item, index) => ({
    ...item,
    id: index,
    quantity: 0,
  }));
  const [cartItems, setCartItems] = useState(itemsWithIds);
  const [total, setTotal] = useState(0);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        total += item.quantity * item.price;
        return total;
      }, 0)
      .toFixed(2);
  };

  useEffect(() => {
    setTotal(calculateTotal());
  }, [cartItems]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 } // Ensure quantity is always at least 1
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(
      cartItems.filter((item) => {
        return item.id !== id;
      })
    );
  };

  return (
    <section className="w-full h-[90%] bg-white p-6 flex flex-col px-20">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Shopping Cart
      </h2>
      <div className="w-full h-[90%] flex rounded-lg shadow-md border border-gray-200">
        <div className="w-1/2 h-full overflow-y-auto px-12 py-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center">Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 text-gray-500 hover:text-gray-800 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 text-gray-500 hover:text-gray-800"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="w-1/2 h-full overflow-y-auto px-12 py-12 flex flex-col justify-start">
          <article className="text-pretty">
            {cartItems.map((item) => {
              return (
                <div className="flex justify-between w-full text-xs">
                  <p className="w-1/2">
                    {item.name} x {item.quantity}
                  </p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              );
            })}
            <div className="flex justify-between w-full font-extrabold text-sm">
              <p className="w-1/2">Tax</p>
              <p>${(0).toFixed(2)}</p>
            </div>
            <div className="flex justify-between w-full font-extrabold text-sm">
              <p className="w-1/2">Shipping & Handling</p>
              <p>${(0).toFixed(2)}</p>
            </div>
          </article>
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <span className="text-lg font-bold text-gray-800">Total:</span>
            <span className="text-lg font-bold text-gray-900">${total}</span>
          </div>

          <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
