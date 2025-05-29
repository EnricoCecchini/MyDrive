import React from 'react'
import Navbar from '../../components/Navbar'
import TextInput from '../../components/inputs/TextInput'
import PasswordInput from '../../components/inputs/PasswordInput'
import ButtonConfirm from '../../components/buttons/ButtonConfirm'

function Profile() {
    const username = "Hello"
    const email = "World"

    const handleInputChange = (e: any) => {
        e.preventDefault()

        console.log(e.target.value)
    }

    return (
        <>
            <div className="contain-content w-full h-screen">
                <Navbar />
                <div className='flex items-center justify-center w-full h-[100%]'>
                    <div className='flex flex-col w-[40%] h-[fit] p-4 bg-indigo-400 rounded-4xl opacity-75'>
                        <form className='flex flex-col justify-center items-center w-full h-full px-8 py-6 gap-y-2'>
                            <span className='flex flex-row justify-evenly align-middle flex-nowrap w-full text-left text-xl text-white pb-4'>
                                <div className='flex items-start w-full gap-x-2'>
                                    <span className='font-bold'>Date Registered:</span>
                                    <span className='italic'>{"2025-05-29"}</span>
                                </div>

                                <img
                                    src="https://thumbs.dreamstime.com/b/funny-avatar-cunning-emoji-flat-vector-illustration-comic-yellow-social-media-sticker-humorous-cartoon-face-smiling-mouth-162122340.jpg"
                                    className='rounded-[100%] w-32 h-32'
                                />
                            </span>

                            <TextInput name='username' placeholder='Username' disabled={false} label='Username' />
                            <TextInput name='email' placeholder='Email' disabled={false} label="Email" />

                            <div className='flex flex-row flex-wrap lg:flex-nowrap gap-x-2 w-full'>
                                <PasswordInput name="password" placeholder='Change assword' />
                                <PasswordInput name="password_confirm" placeholder='Confirm password' label='Confirm password'/>
                            </div>

                            <ButtonConfirm />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile