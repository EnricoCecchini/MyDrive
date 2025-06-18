import React from 'react'
import FolderItem from '../../../components/other/FolderItem'

interface FolderSeciontInterface {
    folders: Array<{id: number, name:string, hash:string, tags: Array<{id:number, name: string}>}>
}

const FolderSection: React.FC<FolderSeciontInterface> = ({folders}) => {
    console.log(folders)

    return (
        <div className='flex flex-col w-full items-start gap-y-4 px-4'>
            <h2 className='text-2xl text-gray-700'>Folders</h2>

            <div className='flex flex-row w-full h-full flex-wrap gap-4'>
                {folders.map((item, index) => {
                    return (
                        <div key={`dir${index}`}>
                            <FolderItem id={item.id} name={item.name} hash={item.hash} tags={item.tags} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FolderSection