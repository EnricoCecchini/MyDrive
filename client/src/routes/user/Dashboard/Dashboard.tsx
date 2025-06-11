import React, { useEffect, useState } from 'react'
import PageWrapper from '../../PageWrapper'
import Navbar from '../../../components/Navbar'
import AddIcon from '@mui/icons-material/Add';
import FolderSection from './FolderSection';
import ContextMenu from '../../../components/ContextMenu';
import ButtonCustom from '../../../components/buttons/ButtonCustom';
import { useParams } from 'react-router-dom';
import { getFolderDashboard } from '../../../api/user/dashboardAPI';

function Dashboard() {
    const { folder_hash } = useParams<{ folder_hash: string }>()

    const [folders, setFolders] = useState<any[]>([])
    const [files, setFiles] = useState<any[]>([])

    useEffect(() => {
        console.log("Folder Hash:", folder_hash)

        const fetchCurrFolderContent = async () => {
            try {
                console.log("Folder", folder_hash)
                const resp = await getFolderDashboard({ folder_hash: folder_hash || "root" })

                if (resp.status !== 200 || !('data' in resp)) {
                    console.error("Error fetching folder content:", 'data' in resp ? resp.data.message : "Unkown error.")
                }

                if (!('data' in resp)) {
                    console.error("Error fetching folder content: Response does not contain data.")
                    return
                }

                setFolders(resp.data.data.folders.map((item: any) => {
                    return {
                        name: item.name,
                        folder_hash: item.hash,
                        tags: item.tags.map((tag: any) => {
                            return {
                                id: tag.id,
                                name: tag.name
                            }
                        })
                    }
                }))

                setFiles(resp.data.data.files.map((item: any) => {
                    return {
                        name: item.name,
                        file_hash: item.hash,
                        file_type_id: item.type,
                        file_type_name: item.type_name,
                        tags: item.tags.map((tag: any) => {
                            return {
                                id: tag.id,
                                name: tag.name
                            }
                        })
                    }
                }))

            } catch (e) {
                console.log("Error fetching folder content:", e)
            }
        }

        fetchCurrFolderContent()
    }, [folder_hash])

    const handleNewDocs = async () => {
        console.log("New Docs Created")

    }

    // const contextMenuOptions = [
    //     {id: 1, name: "New Docs"},
    //     {id: 2, name: "New Sheet"},
    //     {id: 3, name: "Upload File"}
    // ]

    // // const folders = [
    // //     {id: 1, name: "Directory 1", url: "/folders/1", tags: []},
    // //     {id: 2, name: "Directory 2", url: "/folders/2", tags: []},
    // //     {id: 3, name: "Directory 3", url: "/folders/3", tags: []},
    // // ]

    return (
        <>
            <PageWrapper>
                <Navbar />
                <div
                    className='flex flex-col w-full h-full px-4 gap-y-4  border-2 border-red-500'
                    onContextMenu={(e) => {e.preventDefault(); console.log("Context Menu Opened")}}
                >
                    <h1 className='text-3xl'>
                        Files
                    </h1>
                    <ButtonCustom icon={<AddIcon />} label='New Docs' width='fit' onClick={handleNewDocs} />

                    <FolderSection folders={folders} />
                </div>
            </PageWrapper>
        </>
    )
}

export default Dashboard