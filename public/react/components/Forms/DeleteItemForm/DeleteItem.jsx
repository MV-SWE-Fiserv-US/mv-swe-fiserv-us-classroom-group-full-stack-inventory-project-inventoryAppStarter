import React, { useState } from 'react';
import apiURL from '../../../api';

export default function DeleteItem({ item, setSingleItem }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleDelete() {
        fetch(`${apiURL}/${item.id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Item could not be deleted.");
            }
            setSingleItem(null)
        })
        .catch(error => {
            console.log("Oh no an error! ", error);
        });
        setIsModalOpen(false);
    }

    return (
        <>
            <div className="flex justify-center">
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
                        <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this item?</h2>
                        <div className="flex justify-between space-x-4">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <div className="flex justify-center" >
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