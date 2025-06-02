import React from 'react'
import { useAuth } from './AuthProvider'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { is_authenticated } = useAuth()

    // If user is not autheticated, redirect to Login page, else render page
    if (!is_authenticated) {
        return <Navigate to="/login" />
    }

    return (
        <>{ children }</>
    )
}
