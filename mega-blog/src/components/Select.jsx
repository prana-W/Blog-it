import React from 'react'

function Select({options, label, className, ref, ...props}) {
  return (
    <>

    {label && (
      <label htmlFor={label} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    )}

    <select name="" id="" ref={ref}>

    {options?.map((option) => (<option key={option} value={option}>{option}</option>))}     
    </select>
    
    </>
  )
}

export default Select