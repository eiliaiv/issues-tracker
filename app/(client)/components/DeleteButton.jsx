"use client"


import React, { useState } from 'react'
import { Button, AlertDialog, Flex } from '@radix-ui/themes'
import { TrashIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import SpinnerLil from './SpinnerLil'

const DeleteButton = ({ id, title }) => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const fnDelete = async () => {
    try {
      await axios.delete("/api/deleteIssues", { data: { id } })
      router.push("/issue");
      setSpinner(false)
    } catch (error) {
      console.log("failed")
      setSpinner(false)

    }
  }

  return (
    <div className='ml-5'>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={spinner} color="red"><TrashIcon />Delete {spinner && <SpinnerLil color='red'/>}</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Are you sure to delete "{title}"?</AlertDialog.Title>
          <AlertDialog.Description size="2">
            This application will no longer be accessible to this data.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={()=>{fnDelete()
                setSpinner(true)
              }}>
                Confirm
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

    </div>
  )
}


export default DeleteButton
