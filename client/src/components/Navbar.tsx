import React from 'react'

function Navbar() {
    const options = [
        {name: "Home", url: "/"},
        {name: "Recent Files", url: "/recent"},
        {name: "Trash", url: "/trash"}
    ]

    return (
        <>
            <div className='flex flex-row w-full justify-between p-4'>
                <div className='flex items-start'>
                    {options.map((item) => {
                        return (
                            <div key={item.name} className='px-2'>
                                <span>{item.name}</span>
                            </div>
                        )
                    })}
                </div>
                <div className='flex items-end'>
                    <span>Profile</span>
                </div>
            </div>
        </>
    )
}

export default Navbar