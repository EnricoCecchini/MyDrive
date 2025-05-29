import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function SearchInput() {
  return (
    <div className='flex flex-row flex-nowrap bg-indigo-300 p-2 rounded-2xl gap-x-2'>
        <input className='h-full w-full focus:outline-none' type="text" name="search" placeholder='Search'/>
        <SearchOutlinedIcon sx={{fontSize: "2rem"}}/>
    </div>
  )
}

export default SearchInput