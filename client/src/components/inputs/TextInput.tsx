import React from 'react'

interface TextInputInterface {
    name: string
    placeholder: string
}

const TextInput: React.FC<TextInputInterface> = ({name="textinput", placeholder="placeholder"}) => {
  return (
    <input className='w-full rounded-lg mb-4 p-2 text-lg text-white bg-gray-600' type="text" name={name} placeholder={placeholder} />
  )
}

export default TextInput