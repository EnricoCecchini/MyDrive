import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { postLoginForm } from '../../api/auth/loginAPI'
import LoginImage from "../../assets/images/login.jpg"
import { useAuth } from '../../auth/AuthProvider'
import ButtonConfirm from '../../components/buttons/ButtonConfirm'
import EmailInput from '../../components/inputs/EmailInput'
import PasswordInput from '../../components/inputs/PasswordInput'
import PageWrapper from '../PageWrapper'

function Login() {
    const [isPosting, setIsPosting] = useState<boolean>(false)
    const navigator = useNavigate()

    const { login, is_authenticated } = useAuth()

    useEffect(() => {
        if (is_authenticated) {
            navigator("/")
        }

    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (isPosting) {
            return
        }

        setIsPosting(true)

        try {
            const formData = new FormData(e.target)
            const username = formData.get("email") as string;
            const password = formData.get("password") as string;

            if (!username || !password) {
                toast.error("Missing fields!")
                return
            }

            console.log(username, password)
            const resp = await postLoginForm({username, password})

            console.log(resp)
            if (resp && resp.status === 200) {
                login(resp.token)
                navigator("/")
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
                <div className='flex flex-row lg:flex-nowrap flex-wrap h-[50%] w-[90%] lg:h-[60%] lg:w-[60%] bg-gray-800 py-8 rounded-2xl items-center justify-center shadow-2xl'>
                    <div className='hidden lg:flex items-center justify-center h-full w-full mx-4 '>
                        <img src={LoginImage} className='object-contain rounded-2xl h-fit w-fit' />
                    </div>

                    <div className='flex mx-4 p-4 h-full w-full justify-center'>
                        <form onSubmit={handleSubmit} className='flex w-full md:w-[80%] lg:w-[80%] h-full items-center'>
                            <div className='flex flex-col gap-2 py-4 w-full h-fit'>
                                <h1 className='text-4xl text-white my-4'>Log In</h1>
                                    <EmailInput />
                                    <PasswordInput />
                                    <ButtonConfirm />
                                <p className='w-full text-center text-base text-white pt-4'>Dont' have an account? <a className='hover:text-indigo-400' href="/register">Register here.</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

export default Login