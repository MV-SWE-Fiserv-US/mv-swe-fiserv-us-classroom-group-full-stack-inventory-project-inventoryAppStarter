import React, { useState } from "react"
import apiURL from "../../api"

export default function Login() {

  const [loginOrRegister, setLoginOrRegister] = useState(null)
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: ""
  })
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginFormData({ ...loginFormData, [name]: value })
  }

  const handleChangeRegister = (e) => {
    const { name, value } = e.target
    setRegisterFormData({ ...registerFormData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login submitted", loginFormData)
  }

  const handleSubmitRegister = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login submitted", registerFormData)
  }

  const loginPrompts = {
    login: (    <section className="h-screen w-full flex justify-center py-12 px-12">
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
              value={loginFormData.email}
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
              value={loginFormData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-auto flex space-x-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
              onClick={() => setLoginOrRegister(null)}
            >
              Go Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>),
    register: (<section className="h-screen w-full flex justify-center py-12 px-12">
      <div className="w-full max-w-md rounded-lg shadow-lg border border-gray-300 py-2 px-4 max-h-[50vh] flex flex-col">
        <div className="px-4 sm:px-0">
          <h3 className="text-2xl font-semibold text-gray-900">
            Register
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Please enter your details to register.
          </p>
        </div>
        <form onSubmit={handleSubmitRegister} className="flex flex-col mt-6 flex-grow">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={registerFormData.name}
              onChange={handleChangeRegister}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email address</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={registerFormData.email}
              onChange={handleChangeRegister}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={registerFormData.password}
              onChange={handleChangeRegister}
            />
          </div>
          <div className="mt-auto flex space-x-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
              onClick={() => setLoginOrRegister(null)}
            >
              Go Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>)
  }

  return (
    <>
    {loginOrRegister === 'login' && loginPrompts.login}
    {loginOrRegister === 'register' && loginPrompts.register}
      {!loginOrRegister && (
        <section className="h-screen w-full flex justify-center py-12 px-12">
          <div className="w-full max-w-md rounded-lg shadow-lg border border-gray-300 py-2 px-4 max-h-[30vh] flex flex-col">
            <div className="px-4 sm:px-0">
              <h3 className="text-2xl font-semibold text-gray-900">
                Welcome
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Please choose an option to proceed.
              </p>
            </div>
            <div className="flex flex-col mt-6 flex-grow">
              <div className="mb-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full mb-4"
                  onClick={() => setLoginOrRegister('login')}
                >
                  Login
                </button>
              </div>
              <div className="mb-4">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full mb-4"
                  onClick={() => setLoginOrRegister('register')}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );