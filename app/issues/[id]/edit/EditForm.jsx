'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { Button, TextField } from '@radix-ui/themes'
import SpinnerLil from '../../components/SpinnerLil'
import Notification from '../../components/Notification'
import { useNotif } from '../../hook/useNotif'
import SpinnerBig from '../../components/SpinnerBig'
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation'


const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <div className='flex justify-center items-center' ><SpinnerBig /></div>
})

const EditForm = ({ issue }) => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      title: issue.title || '',
      description: issue.description || '',
    },
  })

  const [err, setErr] = useState('')
  const [spinner, setSpinner] = useState(false)
  const isNotifVisible = useNotif(err, setErr, 2500)
  const router = useRouter()

  const onSubmit = async (data) => {
    setSpinner(true)
    try {
      await axios.put('/api/updateIssues', {
        ...data,
        id: issue.id,
      })
      setSpinner(false)
      router.push(`/issues/${issue.id}`)
    } catch (e) {
      setErr('Failed to update issue')
      setSpinner(false)
    }
  }

  return (
    <div>
      {err && <Notification color="red" isVisible={isNotifVisible}>{err}</Notification>}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-5">
        <TextField.Root placeholder="Issues Title" {...register('title')} />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              value={field.value ?? ''}
              onChange={field.onChange}
            />
          )}
        />

        <Button type="submit" onClick={() => setSpinner(true)}>Save {spinner && <SpinnerLil />}</Button>
      </form>
    </div>
  )
}

export default EditForm
