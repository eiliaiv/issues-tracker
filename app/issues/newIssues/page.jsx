'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import React from 'react'
import dynamic from 'next/dynamic';
import { Button, Callout, TextField } from "@radix-ui/themes";
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
  const [err, setErr] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!err) return;

    setIsVisible(true);

    const fadeOutTimer = setTimeout(() => setIsVisible(false), 2500);
    const removeTimer = setTimeout(() => setErr(''), 2800);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [err]);

  const fnCreateIssues = async (data) => {
    try {
      await axios.post('/api/createIssues', data);
      router.push('/issues');
    } catch (error) {
      setErr('Failed to create issue. Please try again.');
    }
  };

  return (
    <div>
      {err && (
        <Callout.Root
          color="red"
          className={`mb-3 transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <Callout.Text>{err}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(fnCreateIssues)} className="max-w-xl space-y-5">
        <TextField.Root placeholder="Issues Title" {...register('title')} />
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
    </div>
  );
};

export default NewIssues
