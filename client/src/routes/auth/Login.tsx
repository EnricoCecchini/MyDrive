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
        <div className=''>
            <div className='flex h-screen w-full items-center justify-center border-1 border-red-700'>
                <div className='flex flex-row h-fit w-[60%] border-1 border-blue-700 bg-gray-800'>
                    <div className='border-1 border-green-500 bg-blue-400 rounded-2xl h-[100%] w-full'>

                    </div>

                    <div className='flex flex-col gap-2 py-4 p-4 h-fit w-full'>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col gap-2 py-4'>
                                <h1 className='text-4xl text-white'>Log In</h1>
                                <p className='text-base text-white my-4'>Dont' have an account? <a className='hover:text-indigo-400' href="/register">Register here.</a></p>
                                    <EmailInput />
                                    <PasswordInput />
                                    <ButtonConfirm />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login