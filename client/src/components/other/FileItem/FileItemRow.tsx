import React from 'react'
import type { FileItemInterface } from './FileItemInterface'
import { FileTypeIcon } from '../../FileTypeIcons'

const FileItemRow: React.FC<FileItemInterface> = ({name, type, hash, date_created, handleClick}) => {

    const handleIcon = () => {
        const iconType = FileTypeIcon(type, "sm")
        return iconType.icon
    }

    return (
        <div
        className="flex flex-row justify-between items-center w-full border rounded-lg p-4 gap-x-2 bg-white hover:bg-gray-200"
        onClick={() => handleClick(type, hash)}
        >
            <div className="flex flex-row items-center flex-grow gap-x-2 min-w-0">
                <span className="text-sm flex-shrink-0">{type ? handleIcon() : null}</span>
                <span className="text-sm text-start break-words truncate w-full">{name}</span>
            </div>


            <span className="hidden lg:flex text-xs text-end whitespace-nowrap flex-shrink-0">
                Created: {date_created}
            </span>
        </div>
    )
}

export default FileItemRow