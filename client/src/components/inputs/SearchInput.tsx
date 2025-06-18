import React, { useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

interface SearchInputInterface {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    items?: [any] | null
    onClickItem: (item: any) => void
}

const SearchInput: React.FC<SearchInputInterface> = ({ items, onChange, onClickItem }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)

    console.log("Items")

    return (
        <div className='flex flex-row w-full justify-center'>
            <div
                className={`flex flex-col w-[80%] rounded-3xl p-2 px-4 text-lg items-center transition-all gap-y-2 text-white ${
                    isFocused ? 'ring-2 ring-indigo-800 bg-gray-500' : 'bg-gray-400'
                }`}
            >
                <div className={"flex flex-row w-full"}>
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

                <div className='flex flex-row w-full'>
                    {isFocused && items && items.length > 0 && (
                        <div className='flex flex-col w-full h-fit z-50 border rounded-xl p-2' onMouseDown={(e) => e.preventDefault()}>
                            {
                                items?.map((item, index) => {
                                    return (
                                        <div key={index} className='flex flex-row w-full text-wrap hover:bg-indigo-400 p-2 rounded-2xl justify-between' onClick={() => onClickItem(item)}>
                                            <div className='flex flex-col'>
                                                <span className='text-sm'>{item.name || ""}</span>
                                                {!item.is_folder ? <span className='text-sm'>{item.location || ""}</span> : null}
                                            </div>
                                            <span className='text-sm'>{item.date_updated || ""}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchInput