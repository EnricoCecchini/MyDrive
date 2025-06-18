import React, { useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

interface SearchInputInterface {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    files?: []
    folders?: []
}

const SearchInput: React.FC<SearchInputInterface> = ({ onChange }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)

    return (
        <div
            className={`flex flex-row w-full rounded-lg p-2 text-lg  transition-all gap-x-2 text-white ${
                isFocused ? 'ring-2 ring-indigo-800 bg-gray-500' : 'bg-gray-600'
            }`}
        >
            <input
                className='h-full w-full focus:outline-none text-lg text-white'
                type="text"
                name="search"
                placeholder='Search'
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <span><SearchOutlinedIcon sx={{fontSize: "2rem"}} /></span>
        </div>
    )
}

export default SearchInput