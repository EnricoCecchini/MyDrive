import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import TextInput from '../../components/inputs/TextInput'
import PasswordInput from '../../components/inputs/PasswordInput'
import ButtonConfirm from '../../components/buttons/ButtonConfirm'
import { getUserProfile, updateUserPassword } from '../../api/user/profileAPI'
import { toast } from 'react-toastify'
import PageWrapper from '../PageWrapper'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Loading from '../../components/Loading'

function Profile() {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [createdAt, setCreatedAt] = useState<string>("")

    const [password, setPassword] = useState<string>("")
    const [password_confirm, setPasswordConfirm] = useState<string>("")

    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchUserProfile = async () => {
            setIsLoading(true)
            const r = await getUserProfile();

            if ("message" in r && r.status !== 200) {
                toast.error(r.message)
                setIsLoading(false)
                return
            }

            if (!("data" in r)) {
                console.log("Missing fields.")
                toast.error("Something went wrong. Try again later.")
                return
            }

            setUsername(r.data.username)
            setEmail(r.data.email)

            const dateObject = new Date(r.data.created_at)
            console.log("Date Register", r.data.created_at)
            console.log('DATE OBJ:', dateObject)

            const formatted = dateObject.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            setCreatedAt(formatted)
            setIsLoading(false)
        }

        fetchUserProfile()
    }, [])

    const handleUpdatePassword = async (e: any) => {
        e.preventDefault()

        if (isLoading) {
            toast.info("Request in progress.")
            return
        }

        setIsLoading(true)

        // Password validation
        if (!password || !password_confirm) {
            toast.warn("Please write your new password and confirm it.")
            setIsLoading(false)
            return
        }

        // Password validation
        if (password !== password_confirm) {
            toast.warn("Passwords don't match.")
            setIsLoading(false)
            return
        }

        const resp = await updateUserPassword({password, password_confirm})
        if (resp.status !== 200) {
            toast.error("Password could not be updated. Please try again.")
            setIsLoading(false)
            return
        }

        toast.success("Password updated successfully.")
        setIsLoading(false)
    }

    const render = () => {
        if (!isLoading) {
            return (
                <>
                    <form onSubmit={handleUpdatePassword} className='flex flex-col justify-evenly contain-content overflow-y-scroll w-[80%] lg:w-[40%] h-full bg-indigo-400 shadow-2xl p-4 rounded-2xl'>
                        <span className=''>
                            <div className='flex items-end w-full gap-x-2 mt-8 lg:mt-0 flex-wrap lg:flex-nowrap'>
                                <span className='font-bold w-fit text-nowrap'>Date Registered:</span>
                                <span className='italic sm:w-full'>{createdAt}</span>
                            </div>
                        </span>

                        <TextInput
                            name='username'
                            placeholder='Username'
                            disabled={true}
                            label='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextInput
                            name='email'
                            placeholder='Email'
                            disabled={true}
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className='flex flex-row flex-wrap lg:flex-nowrap gap-x-2 w-full mb-4'>
                            <PasswordInput
                                name="password"
                                placeholder='Change assword'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <PasswordInput
                                name="password_confirm"
                                placeholder='Confirm password'
                                label='Confirm password'
                                value={password_confirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                        </div>

                        <ButtonConfirm />
                    </form>
                </>
            )
        }

        return (
            <Loading />
        )
    }

    return (
        <>
            <div className='contain-content overflow-y-scroll'>
            <PageWrapper bg_color='white'>
                <Navbar />
                <div className='flex flex-col w-full min-h-screen justify-center items-center py-4'>
                    <div className='flex flex-row justify-center w-full h-fit lg:h-[60%]'>
                        <div className='flex flex-col w-full items-center text-2xl text-white'>
                            {render()}
                        </div>
                    </div>
                </div>
            </PageWrapper>
            </div>
        </>
    )
}

export default Profile