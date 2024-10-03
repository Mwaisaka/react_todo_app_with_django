import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 w-full">
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2024 <t />
            <a href="https://github.com/Mwaisaka" className="hover:underline">
              M-soft Technologies Ltd
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
