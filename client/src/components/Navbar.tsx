import React, { useState } from 'react'

function Navbar() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const options = [
        {name: "Home", url: "/"},
        {name: "Recent Files", url: "/recent"},
        {name: "Trash", url: "/trash"}
    ]

    return (
        <>
            <div className='flex flex-row w-full justify-between items-center p-2 bg-indigo-400 text-white font-bold text-2xl'>
                <div className='flex items-start gap-x-4'>
                    <span className='text-4xl italic px-4'>MyDrive</span>
                    {options.map((item) => {
                        return (
                            <span
                                key={item.name}
                                className='h-full p-2 rounded-lg hover:bg-indigo-800'
                            >
                                <a href={item.url}>{item.name}</a>
                            </span>
                        )
                    })}
                </div>
                <div className='flex items-end'>
                    <span className='h-full p-2 rounded-lg hover:bg-indigo-800'>Profile</span>
                </div>
            </div>
        </>
    )
}

export default Navbar