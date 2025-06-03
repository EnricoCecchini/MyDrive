import React from 'react'
import PageWrapper from '../PageWrapper'
import Navbar from '../../components/Navbar'

function Dashboard() {
    const new_file_routes = [
        {name: "Document", url: "/document/new", icon: ""},
        {name: "SperadSheet", url: "/spreadsheet/new", icon: ""}
    ]

    return (
        <>
            <PageWrapper>
                <Navbar />
                <div>
                    {new_file_routes.map((item) => {
                        return <a href={item.url}>New {item.name}</a>
                    })}
                </div>
            </PageWrapper>
        </>
    )
}

export default Dashboard