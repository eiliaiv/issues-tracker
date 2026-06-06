'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react'
import dynamic from 'next/dynamic';
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form"
import axios from 'axios';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const NewIssues = () => {
  const { register, control, handleSubmit } = useForm();
  const router = useRouter();

  const fnCreateIssues = async (data) => {
    await axios.post('/api/createIssues', data);
    router.push('/issues');
  }
  return (
    <form onSubmit={handleSubmit(fnCreateIssues)} className="max-w-xl space-y-5">
      <TextField.Root placeholder="Issues Title" {...register('title')}>
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE
            placeholder="Issues Description"
            value={field.value || ""}
            onChange={field.onChange}
          />
        )}
      />
      <Button type="submit">submit</Button>
    </form>
  )
}

export default NewIssues
