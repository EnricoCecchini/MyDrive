import React, { useState } from 'react'
import { postUploadFile } from '../../api/files/postUploadFile'
import { toast } from 'react-toastify'
import Loading from '../Loading'


interface FileUploadInterface {
    hash: string | undefined
    children: React.ReactNode
}

export const FileUploadWrapper: React.FC<FileUploadInterface> = ({hash, children}: FileUploadInterface) => {
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [isUploading, setIsUploading] = useState<boolean>(false)

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

        setIsUploading(true)
        try {
            // Get dropped files from event
            const files = Array.from(e.dataTransfer.files)

            // Post each file individually
            for (let i = 0; i < files.length; i ++) {
                const currFile = files[i]

                console.log(currFile)
                const resp = await postUploadFile({folder_hash: hash || null, file: currFile})
                console.log(resp)

                // Error notification if file is not uploaded, but continue posting other files.
                if (resp.status !== 201) {
                    console.error("Error uploading file:", resp)
                    toast.error(`Error uploading file: ${currFile.name}`)
                } else {
                    // Success notification if file uploaded
                    toast.success(`${currFile.name} uploaded succesfully.`)
                }
            }
        } catch (e) {
            console.log("Error uploading file", e)
            toast.error(e?.toString())
        }
        setIsUploading(false)
    }

    return (
        <>
            <div
                className={`w-full h-full ${isDragging ? 'bg-indigo-300 border-2 border-indigo-500' : 'bg-white hover:bg-indigo-200'}`}
                onDrop={handleDropItem}
                onDragOver={handleDragOver}
                onDragLeave={handleDragExit}
            >
                {!isUploading ? children : <Loading />}
            </div>
        </>
    )
}

export default FileUploadWrapper