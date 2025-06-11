import React from 'react'
import { ColorClasses } from '../ColorClasses'

interface ButtonCustomInterface {
    width?: string;
    color?: string
    color_hover?: string
    icon?: any
    label?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ButtonCustom: React.FC<ButtonCustomInterface> = ({width="full", color="bg_button", color_hover="bg_button_hover", icon, label="Cancel", onClick}) => {
  return (
    <button
        className={`rounded-lg w-${width} ${ColorClasses[color]} hover:${ColorClasses[color_hover]} text-white p-2`}
        onClick={onClick}
    >
        {icon && <span className='mr-2'>{icon}</span>}
        {label}
    </button>
  )
}

export default ButtonCustom