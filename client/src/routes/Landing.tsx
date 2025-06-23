import React from 'react'
import PageWrapper from './PageWrapper'
import { handleGlobalLogout, useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Landing() {
    const navigator = useNavigate()

    return (
        <PageWrapper>
            <>
                <Navbar />
                <button onClick={() => {handleGlobalLogout(); navigator('/login')}}>LOGOUT</button>
            </>
        </PageWrapper>
    )
}

export default Landing