import React from 'react'
import EmailInput from '../../components/inputs/EmailInput'
import PasswordInput from '../../components/inputs/PasswordInput'
import ButtonConfirm from '../../components/buttons/ButtonConfirm'
import Navbar from '../../components/Navbar'
import PageWrapper from '../PageWrapper'
import { toast } from 'react-toastify'
import LoginImage from "../../assets/images/login.jpg"

function Login() {
    const handleSubmit = (e: any) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const { email, password } = Object.fromEntries(formData);

        if (!email || !password) {
            toast.error("Missing fields!")
            return
        }
    }

    return (
        <PageWrapper>
            <div className='flex h-screen w-full items-center justify-center'>
                <div className='flex flex-row lg:flex-nowrap flex-wrap h-[50%] w-[90%] lg:h-[50%] lg:w-[60%] bg-gray-800 py-8 rounded-2xl items-center justify-center shadow-2xl'>
                    <div className='hidden lg:flex items-center justify-center h-full w-full mx-4 '>
                        <img src={LoginImage} className='object-contain rounded-2xl h-full w-fit' />
                    </div>

                    <div className='flex mx-4 p-4 h-full w-full justify-center'>
                        <form onSubmit={handleSubmit} className='flex w-full md:w-[80%] lg:w-[80%] h-full items-center'>
                            <div className='flex flex-col gap-2 py-4 w-full h-fit'>
                                <h1 className='text-4xl text-white my-4'>Log In</h1>
                                    <EmailInput />
                                    <PasswordInput />
                                    <ButtonConfirm />
                                <p className='text-base text-white pt-4'>Dont' have an account? <a className='hover:text-indigo-400' href="/register">Register here.</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

export default Login