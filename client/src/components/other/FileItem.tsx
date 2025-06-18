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
            className="flex-grow basis-[16rem] shrink-0 flex flex-col items-center border rounded-lg p-4 gap-y-2 hover:bg-gray-200"
            onClick={handleClick}
        >
            <span className='break-words w-full text-start'>{file.name}</span>

            <span>{file.type ? fileTypeIcon[file.type].icon : null}</span>

            <span>Created: {file.date_created}</span>
        </div>
    )
}

export default FileItem