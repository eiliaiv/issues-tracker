import { Callout } from "@radix-ui/themes";



import React from 'react'

const Notification = ({children, isVisible, color}) => {
  return (
    <Callout.Root
      color={color}
      className={`mb-3 transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  )
}

export default Notification
