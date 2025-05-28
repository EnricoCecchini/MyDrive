import React from 'react'
import EmailInput from '../../components/inputs/EmailInput'
import PasswordInput from '../../components/inputs/PasswordInput'
import ButtonConfirm from '../../components/buttons/ButtonConfirm'
import Navbar from '../../components/Navbar'
import PageWrapper from '../PageWrapper'

function Login() {
    const handleSubmit = (e: any) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const { email, password } = Object.fromEntries(formData);

        if (!email || !password) {
            alert("Missing fields!")
            return
        }
    }

    return (
        <PageWrapper>
            <div className='flex h-screen w-full items-center justify-center border-1 border-red-700'>
                <div className='flex flex-row lg:flex-nowrap flex-wrap h-fit w-[60%] bg-gray-800 py-8 rounded-2xl items-center justify-center drop-shadow-2xl border-1 border-blue-700'>
                    <div className='bg-blue-400 hidden lg:block rounded-2xl h-[30rem] w-full mx-4 border-1 border-green-500'>

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
        </PageWrapper>
    )
}

export default Login