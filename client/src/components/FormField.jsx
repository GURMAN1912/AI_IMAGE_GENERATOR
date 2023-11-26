import React from 'react'

export default function FormField({LabelName,type,name,placeholder,handleChange,value,handleSurpriceMe,isSurpriceMe}) {
  return (
    <div>
        <div className='flex items-center gap-2 mb-2'>
          <label htmlFor={name} className='block text-sm font-medium text-gray-900'>
           {LabelName}
          </label>
          {isSurpriceMe &&(
            <button type='button'onClick={handleSurpriceMe} className='font-inter font-medium bg-[#427D9D] text-white px-4 py-2 rounded-md'>
              Surprice Me
            </button>
          )}
        </div>
        <input
         type={type}
         id={name}
         name={name}
         placeholder={placeholder}
         value={value}
         onChange={handleChange}
         required
         className='bg-[#DDF2FD] border border-gray-500
         text-gray-900 text-sm rounded-lg focus:ring-[#164863] focus:border-[#164863] outline-none block w-full p-3'

          />
          
    </div>
  )
}
