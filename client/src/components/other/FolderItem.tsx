import React from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from 'react-router-dom';

interface FolderItemInterface {
    id: number;
    name: string;
    hash: string;
    tags: Array<{id: number, name: string}>
}

const FolderItem: React.FC<FolderItemInterface> = ({id, name, hash, tags}) => {
    const navigator = useNavigate();

    return (
        <div
            className='flex flex-col items-center hover:bg-gray-200 border border-blue-600'
            onClick={() => navigator(`/folders/${hash}`)}
        >
            <FolderIcon sx={{fontSize: "8rem"}} />
            <span>{name}</span>
        </div>
    )
}

export default FolderItem