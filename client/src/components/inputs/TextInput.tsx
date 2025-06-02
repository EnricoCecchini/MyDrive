import React, { useState } from 'react'

interface TextInputInterface {
    name: string
    placeholder: string
    disabled?: boolean
    label?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    margin_botton?: number
    children?: React.ReactNode
    minLength?: number
}

const TextInput: React.FC<TextInputInterface> = ({name="textinput", placeholder="placeholder", disabled=false, label="", value, onChange, minLength, type="text", margin_botton=4, children}) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const toggleFocus = (e: boolean) => {
        setIsFocused(e)
    }

    return (
        <div className='w-full'>
            {label && <label className='text-white text-2xl text-wrap lg:text-nowrap'>{label}</label>}

            <div
                className={`flex flex-row w-full rounded-lg mb-${margin_botton} p-2 text-lg  transition-all gap-x-2 text-white ${
                    isFocused ? 'ring-2 ring-indigo-800 bg-gray-500' : 'bg-gray-600'
                }`}
            >
                <input
                    className={`w-full focus:outline-none ${disabled ? "text-gray-400" : ""}`}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onFocus={() => toggleFocus(true)}
                    onBlur={() => toggleFocus(false)}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    minLength={minLength}
                />
                {children && <>{children}</>}
            </div>
        </div>
    )
}

export default TextInput