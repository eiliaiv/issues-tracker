"use client"

import React, { useState } from 'react'
import { Button, DropdownMenu } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import SpinnerLil from '../../(client)/components/SpinnerLil'

const IssueButton = ({ id, status }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = async (newStatus) => {
    if (!id) return
    setLoading(true)
    try {
      const res = await axios.put('/api/updateIssueStatus', { id, status: newStatus })
      if (res.status === 200) {
        router.refresh()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button>{loading ? <SpinnerLil/> : 'Change status'}</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Current: {status}</DropdownMenu.Label>
        <DropdownMenu.Item onClick={() => handleChange('OPEN')}>OPEN</DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => handleChange('IN_PROGRESS')}>In progress</DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => handleChange('CLOSED')}>Closed</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default IssueButton
