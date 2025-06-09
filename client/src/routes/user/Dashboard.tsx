import React from 'react'
import PageWrapper from '../PageWrapper'
import Navbar from '../../components/Navbar'
import FolderIcon from '@mui/icons-material/Folder';
import FolderSection from './Dashboard/FolderSection';

function Dashboard() {
    // const new_file_routes = [
    //     {name: "Document", url: "/document/new", icon: ""},
    //     {name: "SperadSheet", url: "/spreadsheet/new", icon: ""}
    // ]

    const folders = [
        {id: 1, name: "Directory 1", url: "/directory/1", tags: []},
        {id: 2, name: "Directory 2", url: "/directory/2", tags: []},
        {id: 3, name: "Directory 3", url: "/directory/3", tags: []},
    ]

    return (
        <>
            <PageWrapper>
                <Navbar />
                {/* <div>
                    {new_file_routes.map((item) => {
                        return <a href={item.url}>New {item.name}</a>
                    })}
                </div> */}

                <div className='flex flex-col w-full h-full px-4  border-2 border-red-500'>
                    <h1 className='text-3xl'>
                        Files
                    </h1>

                    <FolderSection folders={folders} />
                </div>
            </PageWrapper>
        </>
    )
}

export default Dashboard