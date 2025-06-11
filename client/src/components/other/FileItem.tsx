import React from 'react'

interface FileItemInterface {
    name: string
    hash: string
    type: number
    date_created: string
    date_modified: string
}

const FileItem: React.FC<FileItemInterface> = (file) => {
  return (
    <div>
        {file.name}
        {file.date_created}
        {file.date_modified}
    </div>
  )
}

export default FileItem