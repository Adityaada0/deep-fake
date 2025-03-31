import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage and reset user state
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div>
          <img src="logo2.png" alt="Logo" className="w-[30%]" />
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col items-center p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-900 hover:text-[#398D8D] rounded md:bg-transparent md:p-0"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-gray-900 hover:text-[#398D8D] rounded md:bg-transparent md:p-0"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-900 hover:text-[#398D8D] rounded md:bg-transparent md:p-0"
              >
                Contact
              </Link>
            </li>
            {!user ? (
              <>
                <button className="bg-[#398D8D] hover:bg-[#2e6e6e] px-4 py-2 text-white rounded-xl">
                  <Link to="/login">Login</Link>
                </button>
                <button className="bg-[#398D8D] hover:bg-[#2e6e6e] px-4 py-2 text-white rounded-xl">
                  <Link to="/register">Register</Link>
                </button>
              </>
            ) : (
              <>
                <li className="block py-2 px-3 text-gray-900 rounded md:bg-transparent md:p-0">
                  Hello, <span className="font-bold">{user.email}</span>!
                </li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 px-4 py-2 text-white rounded-xl"
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
