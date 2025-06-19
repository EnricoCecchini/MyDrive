import React from 'react';

import { useNavigate } from 'react-router-dom';
import { FileTypeIcon } from '../../FileTypeIcons';
import type { FileItemInterface } from './FileItemInterface';


const FileItemCard: React.FC<FileItemInterface> = ({name, type, hash, date_created, handleClick}) => {

    return (
        <div
            className="flex-grow basis-[16rem] shrink-0 flex flex-col items-center border rounded-lg p-4 gap-y-2 hover:bg-gray-200"
            onClick={() => handleClick(type, hash)}
        >
            <span className='break-words w-full text-start'>{name}</span>

            <span>{type ? FileTypeIcon[type].icon_lg : null}</span>

            <span>Created: {date_created}</span>
        </div>
    )
}

export default FileItemCard