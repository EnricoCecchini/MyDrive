import React from 'react'

interface PasswordInputInterface {
    name?: string;
}

const PasswordInput: React.FC<PasswordInputInterface> = ({ name="password" }) => {
  return (
    <input className='border-1 rounded-lg p-2 text-lg' type="password" minLength={6} name={name} />
  )
}

export default PasswordInput