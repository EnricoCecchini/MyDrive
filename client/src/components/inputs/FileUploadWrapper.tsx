import React, { useState } from 'react'


interface FileUploadInterface {
    hash: string | undefined
    children: React.ReactNode
}

export const FileUploadWrapper: React.FC<FileUploadInterface> = ({hash, children}: FileUploadInterface) => {
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        if (!isDragging) {
            console.log("Dragging")
            setIsDragging(true)
        }
    }

    const handleDragExit = () => {
        if (isDragging) {
            console.log("Not dragging")
            setIsDragging(false)
        }
    }

    const handleDropItem = async (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("DROPPING", e)

        const files = Array.from(e.dataTransfer.files)
        console.log("FILES", files)
        console.log("HASH", hash)
    }

    return (
        <>
            <div className='hover:bg-amber-500' onDrop={handleDropItem} onDragOver={handleDragOver} onDragLeave={handleDragExit}>
                {children}
            </div>
        </>
    )
}

export default FileUploadWrapper