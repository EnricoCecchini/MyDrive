import React from 'react'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import { useNavigate } from 'react-router-dom';

interface FileItemInterface {
    name: string
    hash: string
    type: number
    date_created: string
}

const FileItem: React.FC<FileItemInterface> = (file) => {
    const navigator = useNavigate()

    const fileTypeIcon: Record<number, any> = {
        1: {icon: <TextSnippetIcon  sx={{fontSize: "8rem"}} />, name: "document"},
        2: {icon: <BorderAllIcon  sx={{fontSize: "8rem"}} />, name: "sheet"}
    }

    const handleClick = () => {
        console.log("Clicked", file.hash)
        navigator(`/${fileTypeIcon[file.type].name}/${file.hash}`)
    }

    return (
        <div
            className="flex flex-col w-[10rem] items-center border rounded-lg p-2 gap-y-2 hover:bg-gray-200"
            onClick={handleClick}
        >
            {file.name}
            {file.type ? fileTypeIcon[file.type].icon : <></>}
            <span className='text-wrap'>Created: {file.date_created}</span>
        </div>
    )
}

export default FileItem