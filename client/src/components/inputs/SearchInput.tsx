import React, { useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function SearchInput() {
    const [searchText, setSearchText] = useState<string>("")

    const handleUpdateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSearchText(e.target.value)
    }

    const handleSearch = () => {
        console.log(searchText)
    }

    return (
        <div className='flex flex-row flex-nowrap bg-indigo-300 p-2 rounded-2xl gap-x-2'>
                <input className='h-full w-full focus:outline-none' type="text" name="search" placeholder='Search' onChange={handleUpdateSearch} />
                <span onClick={handleSearch}><SearchOutlinedIcon sx={{fontSize: "2rem"}} /></span>
        </div>
    )
}

export default SearchInput