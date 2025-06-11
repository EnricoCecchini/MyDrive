import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const {is_authenticated, logout} = useAuth()
    const navigator = useNavigate()

    const handleLogout = () => {
        logout()
        toast.info("Logged out.")

        setTimeout(() => {}, 2000);
        navigator("/login")
    }

    const options = [
        {name: "Home", url: "/folders"},
        {name: "Recent Files", url: "/recent"},
        {name: "Trash", url: "/trash"}
    ]

    const render = () => {
        if (is_authenticated) {
            return <>
                <div className='flex items-start gap-x-4'>
                    <span className='text-4xl italic px-4'>MyDrive</span>

                    <ul className='flex flex-row gap-x-2'>
                        {options.map((item) => {
                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.url}
                                    className="h-full p-2 rounded-lg hover:underline ease-in-out hover:-translate-y-1 hover:scale-110 transition delay-150 duration-300"
                                >
                                    {item.name}
                                </NavLink>
                            )
                        })}
                    </ul>
                </div>
                <div className='h-full w-fit flex flex-row flex-nowrap items-center align-middle'>
                    {/* <span className='w-fit hover:cursor-grab' onClick={() => setIsExpanded(!isExpanded)}><AccountCircleIcon sx={{fontSize: "3rem"}}/></span> */}
                    {
                        isExpanded ? <>
                            <div className='flex flex-col h-full border rounded-2xl w-32 p-2 justify-start items-start align-top'>
                                <div className='flex flex-row w-full h-fit justify-end'>
                                    <span className='w-fit hover:cursor-grab' onClick={() => setIsExpanded(!isExpanded)}>
                                        <CloseIcon />
                                    </span>
                                </div>

                                <NavLink to={"/profile"}>Profile</NavLink>
                                <span className='w-fit hover:underline align-bottom hover:cursor-grab' onClick={handleLogout}>Sign Out</span>

                            </div>
                        </> : <>
                            <span className='w-fit hover:cursor-grab' onClick={() => setIsExpanded(!isExpanded)}><AccountCircleIcon sx={{fontSize: "3rem"}}/></span>
                        </>
                    }
                </div>
            </>
        }

        return <>
            <div className='flex justify-between gap-x-4 w-full'>
                <span className='text-4xl italic px-4'>MyDrive</span>

                <div className='h-full w-fit flex flex-row flex-nowrap items-center align-middle'>
                    <span
                        className='h-full p-2 rounded-lg font-normal hover:underline'
                    >
                        <a href="/login">Sign In</a>
                    </span>
                </div>
            </div>
        </>
    }

    return (
        <div className='flex flex-row w-full bg-indigo-400 text-white text-2xl p-2'>
            <Disclosure as="nav" className="bg-indigo-400 w-full flex flex-row">
                <div className="w-full px-2 sm:px-6 lg:px-2">
                    <div className="relative flex justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <MenuIcon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                <CloseIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                            </DisclosureButton>
                        </div>

                        <div className='flex flex-1'>
                            <span className='text-4xl text-white font-bold italic'>MyDrive</span>
                            <div className='hidden sm:ml-6 flex-row sm:block w-full'>
                                {
                                    options.map((item) =>
                                        <a
                                            className=' align-middle h-full p-2 rounded-lg hover:underline ease-in-out hover:-translate-y-1 hover:scale-110 transition delay-150 duration-300'
                                            key={item.name}
                                            href={item.url}
                                        >
                                            {item.name}
                                        </a>
                                    )
                                }
                            </div>
                        </div>

                        <Menu as="div" className="lg:w-fit md:fit w-full sm:ml-6 sm:block">
                            <div className='flex flex-row justify-end pl-2'>
                                <MenuButton >
                                    <AccountCircleIcon sx={{fontSize: "3rem"}} />
                                </MenuButton>
                            </div>

                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                                <MenuItem>
                                    <a
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                        href='/profile'
                                    >Your Profile</a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                        onClick={handleLogout}
                                    >Sign Out</a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>

                <DisclosurePanel className="sm:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {options.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.url}
                                className={"bg-gray-900 text-white"}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </div>
    )
}

export default Navbar