import React from 'react'

interface PasswordInputInterface {
    name?: string;
}

const PasswordInput: React.FC<PasswordInputInterface> = ({ name="password" }) => {
  return (
    <input className='mb-4 rounded-lg p-2 text-lg text-white bg-gray-600' type="text" name={name} placeholder={name} />
  )
}

export default PasswordInput