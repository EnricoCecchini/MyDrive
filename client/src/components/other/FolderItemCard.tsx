import React from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from 'react-router-dom';

interface FolderItemInterface {
    id: number;
    name: string;
    hash: string;
    tags: Array<{id: number, name: string}>
}

const FolderItemCard: React.FC<FolderItemInterface> = ({id, name, hash, tags}) => {
    const navigator = useNavigate();

    return (
        <div
            className="flex-grow basis-[16rem] shrink-0 flex flex-row items-center border rounded-lg p-4 gap-x-2 gap-y-2 bg-white hover:bg-gray-200"
            onClick={() => navigator(`/folders/${hash}`)}
        >
            <FolderIcon sx={{fontSize: "2rem"}} />
            <span>{name}</span>
        </div>
    )
}

export default FolderItemCard