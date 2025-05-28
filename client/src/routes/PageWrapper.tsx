import React from 'react'
import { ToastContainer } from 'react-toastify'

interface PageWrapperInterface {
    children: React.FC
}

export const PageWrapper: React.FC<{ children: React.ReactNode}> = ({children}) => {
  return (
    <div className='w-full h-full bg-indigo-300'>
        {children}
        <ToastContainer closeOnClick={true} />
    </div>
  )
}

export default PageWrapper