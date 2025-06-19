import React from 'react'
import FileItemCard from '../../../components/other/FileItem/FileItemCard'
import { useNavigate } from 'react-router-dom'
import { FileTypeIcon } from '../../../components/FileTypeIcons'
import FileItemRow from '../../../components/other/FileItem/FileItemRow'

interface FilesSectionInterface {
    files: Array<{
        name:string,
        hash: string,
        type: number,
        type_name: string,
        date_created: string,
        tags: Array<{id:number, name: string}>
    }>
    showAsCard: boolean
}

const FilesSection: React.FC<FilesSectionInterface> = ({ files, showAsCard }) => {
    const navigator = useNavigate()

    const handleClick = (type: number, hash: string) => {
        console.log("Clicked", hash)
        navigator(`/${FileTypeIcon[type].name}/${hash}`)
    }

    console.log("Files", files)
    return (
        // <div className='flex flex-row w-full h-full flex-wrap items-start gap-4 px-4'>
        <div className='flex flex-col w-full items-start gap-y-4 px-4'>
            <h2 className='text-2xl text-gray-700'>Files</h2>

            <div className='flex flex-row w-full h-full'>
                {files && (
                    showAsCard ?
                        <div className='flex flex-row w-full h-full flex-wrap gap-4'>
                            {files.map((item) => {
                                return (
                                    <FileItemCard
                                        key={item.hash}
                                        name={item.name}
                                        hash={item.hash}
                                        type={item.type}
                                        date_created={item.date_created}
                                        handleClick={handleClick}
                                    />
                                )
                            })}
                        </div>
                    : <div className='flex flex-col w-full h-full flex-wrap gap-x-4 gap-y-2'>
                            {files.map((item) => {
                                return (
                                    <FileItemRow
                                        key={item.hash}
                                        name={item.name}
                                        hash={item.hash}
                                        type={item.type}
                                        date_created={item.date_created}
                                        handleClick={handleClick}
                                    />
                                )
                            })}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default FilesSection