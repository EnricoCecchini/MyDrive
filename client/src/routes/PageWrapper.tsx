import React from 'react'
import { ToastContainer } from 'react-toastify'
import { ColorClasses } from '../components/ColorClasses'

interface PageWrapperInterface {
    bg_color?: string
    children: React.ReactNode
}

export const PageWrapper: React.FC<PageWrapperInterface> = ({ children, bg_color="bg_general" }) => {
  return (
    <div className={`w-full h-full ${ColorClasses[bg_color]} border border-red-600 lg:contain-content`}>
        {children}
        <ToastContainer closeOnClick={true} />
    </div>
  )
}

export default PageWrapper