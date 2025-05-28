import React from 'react'

interface PageWrapperInterface {
    children: React.FC
}

export const PageWrapper: React.FC<{ children: React.ReactNode}> = ({children}) => {
  return (
    <div className='w-full h-full bg-indigo-300'>
        {children}
    </div>
  )
}

export default PageWrapper