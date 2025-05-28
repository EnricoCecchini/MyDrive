import React from 'react'
import PageWrapper from './PageWrapper'
import { useAuth } from '../auth/AuthProvider'

function Landing() {
    const {logout} = useAuth()

    return (
        <PageWrapper>
            <>
                <button onClick={() => {logout();}}>LOGOUT</button>
            </>
        </PageWrapper>
    )
}

export default Landing