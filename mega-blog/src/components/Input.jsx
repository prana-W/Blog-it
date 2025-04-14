import React from "react";

function Input({ label, type = "text", className = "", inputRef, ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={label}
        ref={inputRef}
        className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${className}`}
        {...props}
      />
    </div>
  );
}

export default Input;
