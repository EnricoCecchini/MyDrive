import React from 'react'
import PageWrapper from './PageWrapper'
import { useAuth } from '../auth/AuthProvider'
import { useNavigate } from 'react-router-dom'

function Landing() {
    const {logout} = useAuth()
    const navigator = useNavigate()

    return (
        <PageWrapper>
            <>
                <button onClick={() => {logout(); navigator('/login')}}>LOGOUT</button>
            </>
        </PageWrapper>
    )
}

export default Landing