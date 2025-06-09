import React from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from 'react-router-dom';

interface FolderItemInterface {
    id: number;
    name: string;
    url: string;
    tags: Array<{id: number, name: string}>
}

const FolderItem: React.FC<FolderItemInterface> = ({id, name, url, tags}) => {
    const navigator = useNavigate();

    return (
        <div
            className='flex flex-col items-center hover:bg-gray-200 border border-blue-600'
            onClick={() => navigator(url)}
        >
            <FolderIcon sx={{fontSize: "8rem"}} />
            <span>{name}</span>
        </div>
    )
}

export default FolderItem