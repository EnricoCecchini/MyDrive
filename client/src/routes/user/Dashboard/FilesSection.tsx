import React from 'react'
import FileItem from '../../../components/other/FileItem'

interface FilesSectionInterface {
    files: Array<{
        name:string,
        hash: string,
        type: number,
        type_name: string,
        date_created: string,
        tags: Array<{id:number, name: string}>}>
}

const FilesSection: React.FC<FilesSectionInterface> = ({ files }) => {
    console.log("Files", files)
  return (
    // <div className='flex flex-row w-full h-full flex-wrap items-start gap-4 px-4'>
    <div className='flex flex-col w-full items-start gap-y-4 px-4'>
        <h2 className='text-2xl text-gray-700'>Files</h2>

        <div className='flex flex-row w-full h-full flex-wrap gap-4'>
            {files.map((item) => {
                return (
                    <FileItem
                        key={item.hash}
                        name={item.name}
                        hash={item.hash}
                        type={item.type}
                        date_created={item.date_created}
                    />
                )


            })}
        </div>
    </div>
  )
}

export default FilesSection