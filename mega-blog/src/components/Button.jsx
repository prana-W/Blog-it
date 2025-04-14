import React from "react";

function Button({ children }) {
  return (
    <button
      className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-200"
    >
      {children}
    </button>
  );
}

export default Button;
