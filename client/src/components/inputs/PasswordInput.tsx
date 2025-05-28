import React from 'react'

interface PasswordInputInterface {
    name?: string;
    placeholder?: string
}

const PasswordInput: React.FC<PasswordInputInterface> = ({ name="password", placeholder="Enter your password" }) => {
  return (
    <input className='mb-4 rounded-lg p-2 text-white bg-gray-600' type="text" name={name} placeholder={placeholder} />
  )
}

export default PasswordInput