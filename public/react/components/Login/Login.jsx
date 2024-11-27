import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted", formData);
  };

  return (
    <section className="h-screen w-full flex justify-center py-12 px-12">
      <div className="w-full max-w-md rounded-lg shadow-lg border border-gray-300 py-2 px-4 max-h-[50vh] flex flex-col">
        <div className="px-4 sm:px-0">
          <h3 className="text-2xl font-semibold text-gray-900">
            Login
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Please enter your credentials to login.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col mt-6 flex-grow">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email address</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-auto">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full mb-4 "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}