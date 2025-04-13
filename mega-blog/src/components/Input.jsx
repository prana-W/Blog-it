import React from "react";

function Input({ label, type = "text", className, ref, ...props }) {
  return (
    <>
      {label && (
        <label htmlFor={label} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={label}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className}`}
        ref={ref}
        {...props}
      />
    </>
  );
}

export default Input;
