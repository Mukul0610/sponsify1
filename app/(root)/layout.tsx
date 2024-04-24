import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)=> {
  return (
    <main className='root'>
      <div>
        <p>home</p>
      {children}
      </div>
    </main>
  )
}

export default layout
