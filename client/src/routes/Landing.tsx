import React from 'react'
import PageWrapper from './PageWrapper'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Landing() {
    const {logout} = useAuth()
    const navigator = useNavigate()

    return (
        <PageWrapper>
            <>
                <Navbar />
                <button onClick={() => {logout(); navigator('/login')}}>LOGOUT</button>
            </>
        </PageWrapper>
    )
}

export default Landing