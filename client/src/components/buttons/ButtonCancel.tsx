import React from 'react'

interface ButtonCancelInterface {
    label?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ButtonConfirm: React.FC<ButtonCancelInterface> = ({label="Cancel", onClick}) => {
  return (
    <button className='rounded-lg w-full bg-red-600 hover:bg-red-800 text-white p-2' onClick={onClick}>{label}</button>
  )
}

export default ButtonConfirm