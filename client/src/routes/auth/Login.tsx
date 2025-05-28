import React from 'react'
import EmailInput from '../../components/inputs/EmailInput'
import PasswordInput from '../../components/inputs/PasswordInput'
import ButtonConfirm from '../../components/buttons/ButtonConfirm'
import Navbar from '../../components/Navbar'

function Login() {
    const handleSubmit = (e: any) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const { email, password } = Object.fromEntries(formData);

        console.log(email, password)
    }

    return (
        <div className='w-full h-full'>
            <Navbar />

            <div className='border-1 rounded-2xl'>
                <form onSubmit={handleSubmit}>
                    <EmailInput />
                    <PasswordInput />
                    <ButtonConfirm />
                </form>
            </div>
        </div>
    )
}

export default Login