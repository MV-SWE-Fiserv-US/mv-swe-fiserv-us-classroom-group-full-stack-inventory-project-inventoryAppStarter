import React from "react";

function NavBar() {
  return (
    <nav className="bg-white shadow w-full fixed top-0 left-0 z-50">
      <div className="w-full px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold">
          Team Rocket Store
        </a>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-800 hover:text-gray-600">
            Home
          </a>
          <a href="#" className="text-gray-800 hover:text-gray-600">
            About
          </a>
          <a href="#" className="text-gray-800 hover:text-gray-600">
            Services
          </a>
          <a href="#" className="text-gray-800 hover:text-gray-600">
            Contact
          </a>
        </div>
        <div className="md:hidden">
          <button className="text-gray-800 hover:text-gray-600 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
