import React from 'react'
import { Theme } from "@radix-ui/themes";
import Providers from '../auth/Providers'
import NavBar from './components/NavBar'

const layout = ({children}) => {
  return (
    <Providers>
      <Theme>
        <NavBar />
        <main className="px-10">
          {children}
        </main>
      </Theme>
    </Providers>
  )
}

export default layout
