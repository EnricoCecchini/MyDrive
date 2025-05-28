import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { postRegisterForm } from '../../api/auth/registerAPI'
import ButtonConfirm from '../../components/buttons/ButtonConfirm'
import EmailInput from '../../components/inputs/EmailInput'
import PasswordInput from '../../components/inputs/PasswordInput'
import TextInput from '../../components/inputs/TextInput'
import PageWrapper from '../PageWrapper'

import LoginImage from "../../assets/images/login.jpg"

function Register() {
    const [isPosting, setIsPosting] = useState<boolean>(false)

    const navigator = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (isPosting) {
            return
        }

        setIsPosting(true)

        try {
            const formData = new FormData(e.target)
            const email = formData.get("email") as string;
            const username = formData.get("username") as string;
            const password = formData.get("password") as string;
            const password_confirm = formData.get("password_confirm") as string;

            if (!username || !email || !password || !password_confirm) {
                toast.error("Missing fields!")
                return
            }

            if (password !== password_confirm) {
                toast.error("Passwords don't match!")
                return
            }

            const resp = await postRegisterForm({email, username, password, password_confirm})

            if (resp && resp.status === 200) {
                toast.success("Registration successful!")
                setTimeout(() => {}, 5000);
                navigator("/login")
                return
            } else {
                toast.error(resp.message)
            }
        } finally {
            setIsPosting(false)
        }
    }

    return (
            <PageWrapper>
                <div className='flex h-screen w-full items-center justify-center'>
                    <div className='flex flex-row lg:flex-nowrap flex-wrap h-[60%] w-[90%] lg:h-[60%] lg:w-[60%] bg-gray-800 py-8 rounded-2xl items-center justify-center shadow-2xl'>
                        <div className='hidden lg:flex items-center justify-center h-full w-full mx-4 '>
                            <img src={LoginImage} className='object-contain rounded-2xl h-fit w-fit' />
                        </div>

                        <div className='flex mx-4 p-4 h-full w-full justify-center'>
                            <form onSubmit={handleSubmit} className='flex w-full md:w-[80%] lg:w-[80%] h-full items-center'>
                                <div className='flex flex-col gap-2 py-4 w-full h-fit'>
                                    <h1 className='text-4xl text-white my-4'>Sign Up</h1>
                                        <TextInput name="username" placeholder='Username' />
                                        <EmailInput />
                                        <PasswordInput />
                                        <PasswordInput name='password_confirm' placeholder='Confirm your password' />
                                        <ButtonConfirm />
                                    <p className='w-full text-center text-base text-white pt-4'>Already have an account? <a className='hover:text-indigo-400' href="/login">Sign in.</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </PageWrapper>
    )
}

export default Register