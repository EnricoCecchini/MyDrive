import React from 'react'
import FolderItemCard from '../../../components/other/FolderItemCard'
import FileUploadWrapper from '../../../components/inputs/FileUploadWrapper'

interface FolderSeciontInterface {
    folders: Array<{id: number, name:string, hash:string, tags: Array<{id:number, name: string}>}>
    showAsCard: boolean
}

const FolderSection: React.FC<FolderSeciontInterface> = ({ folders, showAsCard }) => {
    console.log(showAsCard)

    return (
        <div className='flex flex-col w-full items-start gap-y-4 px-4'>
            <h2 className='text-2xl text-gray-700'>Folders</h2>

            <div className='flex flex-row w-full h-full flex-wrap gap-4'>
                { folders && (
                    <div className={`flex flex-${showAsCard ? "row" : "col"} w-full h-full flex-wrap gap-4`}>
                        {folders.map((item, index) => {
                            return (
                                <div key={`dir${index}`}>
                                    <FileUploadWrapper hash={item.hash}>
                                        <FolderItemCard id={item.id} name={item.name} hash={item.hash} tags={item.tags} />
                                    </FileUploadWrapper>
                                </div>
                            )
                        }) }
                    </div>
                )}
            </div>
        </div>
    )
}

export default FolderSection