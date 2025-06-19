import React from 'react'
import type { FileItemInterface } from './FileItemInterface'
import { FileTypeIcon } from '../../FileTypeIcons'

const FileItemRow: React.FC<FileItemInterface> = ({name, type, hash, date_created, handleClick}) => {

    return (
        <div
            className="flex flex-row items-center border rounded-lg p-4 gap-x-2 hover:bg-gray-200"
            onClick={() => handleClick(type, hash)}
        >
            <span className='text-sm'>{type ? FileTypeIcon[type].icon_sm : null}</span>
            <span className='break-words w-full text-start'>{name}</span>
            <span>Created: {date_created}</span>
        </div>
    )
}

export default FileItemRow