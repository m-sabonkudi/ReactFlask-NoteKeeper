import React from 'react'


function Input(props) {
  return (
    <div>
        <label className="block mb-1 font-medium text-gray-700">{props.label}</label>
        <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        required
        />
    </div>
  )
}

export default Input