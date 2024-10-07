import React from "react";
import { NavLink } from "react-router-dom";

function Header({ user, onLogout }) {
    console.log("Current user state:", user);
  return (
    <header className="shadow-none sticky z-50 top-1">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 w-full">
        <div>
          <ul className="flex flex-row gap-5 px-2 mt-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                    ${isActive ? "text-orange-500" : "text-gray-700"} 
                    lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                }
              >
                Home
              </NavLink>
            </li>

            <li className="ml-auto">
              {user ? (
                // If the user is logged in, show "Sign out"
                <button
                  onClick={onLogout}
                  className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 text-gray-700 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                  aria-label="Sign out"
                >
                  Sign out
                </button>
              ) : (
                // If the user is not logged in, show "Sign in"
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                      ${isActive ? "text-orange-500" : "text-gray-700"} 
                      lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                  aria-label="Sign in"
                >
                  Sign in
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
