import React, { useState } from 'react'

import VisibilityOn from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import TextInput from './TextInput';

interface PasswordInputInterface {
    name?: string;
    placeholder?: string
}

const PasswordInput: React.FC<PasswordInputInterface> = ({ name="password", placeholder="Enter your password" }) => {
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
            >
                <span onClick={() => toggleVisibility()}>{!isVisible ? <VisibilityOff /> : <VisibilityOn />}</span>
            </TextInput>
        </>
    )
}

export default PasswordInput