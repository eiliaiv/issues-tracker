import React from 'react'
import NavBar from './components/NavBar'

const layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="px-10">
        {children}
      </main>
    </>
  )
}

export default layout
