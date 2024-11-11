import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="bg-gray-300 border-gray-200 px-4 lg:px-6 py-2.5 w-full mt-8 mb-2 py-4">
        <div className="text-center">
          <span className="font-mono text-sm text-gray-700 sm:text-center">
            Copyright © 2024 <t />
            <a href="http://localhost:3000/" className="hover:underline">
              <strong>
                <i>Frank Mwaisaka</i>
              </strong>
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
