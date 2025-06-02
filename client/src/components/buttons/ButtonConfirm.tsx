import React from 'react'

interface ButtonConfirmInterface {
    label?: string
}

export const ButtonConfirm: React.FC<ButtonConfirmInterface> = ({label="Submit"}) => {
  return (
    <button className='rounded-lg w-full bg-indigo-600 hover:bg-indigo-800 text-white p-2' type='submit'>{label}</button>
  )
}

export default ButtonConfirm