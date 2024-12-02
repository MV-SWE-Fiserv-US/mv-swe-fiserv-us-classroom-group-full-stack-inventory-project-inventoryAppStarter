import React, { useState, useEffect } from "react";
import apiURL from "../../../api";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteItem({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleDelete() {
    const url = `${apiURL}/items/${item.id}`;
    console.log(`Deleting item at: ${url}`);

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setIsModalOpen(false);
        toast.success("Item successfully deleted 👍", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          transition: Slide,
        });
      })
      .catch((error) => {
        console.log("Oh no an error! ", error);
        toast.error("Item could not be deleted 😰 Try again later.", {
          position: "top-center",
        });
      });
  }

  useEffect(() => {}, [item]);

  return (
    <>
      <div className="flex justify-center my-8">
        <button
          className="bg-rose-600 hover:bg-rose-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setIsModalOpen(true)}
        >
          Delete Item
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this item?
            </h2>
            <div className="flex justify-between space-x-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <div className="flex justify-center">
                <button
                  className="bg-rose-600 hover:bg-rose-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
