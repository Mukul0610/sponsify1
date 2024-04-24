import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)=> {
  return (
    <main className='auth'>
      {children}
    </main>
  )
}

export default layout
