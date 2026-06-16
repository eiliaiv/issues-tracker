import React from 'react'
import NavBar from "../(client)/components/NavBar"

const layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="px-8">
        {children}
      </div>
    </>
  )
}

export default layout
