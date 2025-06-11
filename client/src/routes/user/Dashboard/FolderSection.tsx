import React from 'react'
import FolderItem from '../../../components/other/FolderItem'

interface FolderSeciontInterface {
    folders: Array<{id: number, name:string, hash:string, tags: Array<{id:number, name: string}>}>
}

const FolderSection: React.FC<FolderSeciontInterface> = ({folders}) => {
  return (
    <div className='flex flex-row w-full h-full overflow-y-scroll flex-wrap items-start gap-4 px-4  border border-green-500'>
        {folders.map((item, index) => {
            return (
                <div key={`dir${index}`}>
                    <FolderItem id={item.id} name={item.name} hash={item.hash} tags={item.tags} />
                </div>
            )
        })}
    </div>
  )
}

export default FolderSection