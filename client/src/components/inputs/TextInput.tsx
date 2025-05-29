import React, { useState } from 'react'

interface TextInputInterface {
    name: string
    placeholder: string
    type?: string
    children?: React.ReactNode
}

const TextInput: React.FC<TextInputInterface> = ({name="textinput", placeholder="placeholder", type="text", children}) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const toggleFocus = (e: boolean) => {
        setIsFocused(e)
    }

    return (
        <div
            className={`flex flex-row w-full rounded-lg mb-4 p-2 text-lg text-white transition-all gap-x-2 ${
                isFocused ? 'ring-2 ring-indigo-400 bg-gray-500' : 'bg-gray-600'
            }`}
        >
            <input
                className='w-full focus:outline-none'
                type={type}
                name={name}
                placeholder={placeholder}
                onFocus={() => toggleFocus(true)}
                onBlur={() => toggleFocus(false)}
            />
            {children && <>{children}</>}
        </div>
    )
}

export default TextInput