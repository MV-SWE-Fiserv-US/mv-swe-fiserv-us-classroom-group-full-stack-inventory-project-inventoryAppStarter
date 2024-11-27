import React, { useState } from 'react'
import apiURL from '../../api'
import vaultIcon from "../../../assets/vault-icon.svg"
import { NavLink } from 'react-router'

export default function Navbar({ setSingleItem }) {
    const [isOpen, setIsOpen] = useState(false)
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const [errorModal, setErrorModal] = useState(false)
//     const [errorMessages, setErrorMessages] = useState(null)
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         category: '',
//         price: '',
//         image: ''
//     })

//     async function addItem() {
//         try {
//             const response = await fetch(`${apiURL}/items/`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             })

//             if (!response.ok) {
//                 const errorData = await response.json()
//                 console.error("Validation errors:", errorData.errors)
//                 setErrorMessages(errorData.errors)
//                 setErrorModal(true)
//                 throw new Error("Item could not be posted.")
//             }

//             const createdItem = await response.json()
//             console.log("Item created successfully:", createdItem)
//         } catch (error) {
//             console.log('hit')
//             console.log("Oh no an error! ", error)
//         }
//     }

//     function handleSubmit(e) {
//         e.preventDefault()
//         addItem()
//         console.log(formData)
//         setIsModalOpen(false)
//         setTimeout(() => {
//             if (errorMessages) {
//                 setTimeout(() => {
//                     setSingleItem(formData)
//                 }, 1000)
//             }
//         }, 2000)
//     }

    // function handleChange(e) {
    //     const { name, value } = e.target
    //     setFormData({ ...formData, [name]: value })
    // }

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={vaultIcon} className="h-10" alt="Vaultry Icon" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent rounded">Vaultry</span>
                </a>
                <button
                    onClick={toggleMenu}
                    type="button"
                    className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-slate-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
                    aria-controls="navbar-hamburger"
                    aria-expanded={isOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 17 14">
                        <path stroke="#1e293b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`${isOpen ? 'block' : 'hidden'} w-full`} id="navbar-hamburger">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg">
                        <li>
                            <NavLink to="/" className="block py-2 px-3 text-slate-800 rounded hover:bg-gray-700 hover:text-white" aria-current="page" onClick={() => setIsOpen(false)} >Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" className="block py-2 px-3 text-slate-800 rounded hover:bg-gray-700 hover:text-white" onClick={() => setIsOpen(false)}>Cart</NavLink>
                        </li>
                        <li>
                            <NavLink to="/auth" className="block py-2 px-3 text-slate-800 rounded hover:bg-gray-700 hover:text-white" onClick={() => setIsOpen(false)}>Login / Sign Up</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard" className="block py-2 px-3 text-slate-800 rounded hover:bg-gray-700 hover:text-white" onClick={() => setIsOpen(false)} >Dashboard</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <hr className="border-t border-gray-700"></hr>
            {/* {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Hello User</h2>
                        <form className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200" onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Inventory Item</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="category"
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="price"
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image URL</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="image"
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => setIsModalOpen(false)}
                                > 
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                > 
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )} */}
        </nav>
    );
}