import React from "react";
import { NavLink } from "react-router-dom";

function Header({ user, onLogout }) {
  console.log("Current user state:", user);
  return (
    <header className="shadow-none sticky z-50 top-2 mb-8">
      <nav
        className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 w-full"
        // style={{
        //   backgroundImage:
        //     "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 320%22%3E%3Cpath fill=%22%234FD1C5%22 fill-opacity=%221%22 d=%22M0,160L80,186.7C160,213,320,267,480,272C640,277,800,235,960,224C1120,213,1280,235,1360,245.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z%22%3E%3C/path%3E%3C/svg%3E')",
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover",
        // }}
      >
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
