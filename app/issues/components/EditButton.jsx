import React from 'react'
import { Button } from '@radix-ui/themes'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

const EditButton = ({ id }) => {
  return (
    <Link href={`/issues/${id}/edit`}>
      <Button><Pencil2Icon />Edit</Button>
    </Link>
  )
}

export default EditButton
