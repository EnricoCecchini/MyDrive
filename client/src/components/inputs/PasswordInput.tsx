import React, { useState } from 'react'

import VisibilityOn from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import TextInput from './TextInput';

interface PasswordInputInterface {
    name?: string;
    placeholder?: string
    label?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PasswordInput: React.FC<PasswordInputInterface> = ({ name="password", placeholder="Enter your password", label="Password", value, onChange }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const toggleVisibility = () => {
        const show = isVisible;
        setIsVisible(!show)
    }

    return (
        <>
            <TextInput
                name={name}
                placeholder={placeholder}
                type={!isVisible ? "password" : "text"}
                label={label}
                value={value}
                onChange={onChange}
                minLength={6}
            >
                <span onClick={() => toggleVisibility()}>{!isVisible ? <VisibilityOff /> : <VisibilityOn />}</span>
            </TextInput>
        </>
    )
}

export default PasswordInput