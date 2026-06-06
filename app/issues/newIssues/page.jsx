'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import React from 'react'
import dynamic from 'next/dynamic';
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form"
import axios from 'axios';
import { validate } from "../../api/zodValidation/Validation";
import ErrorMessage from '../components/ErrorMessage';
import SpinnerLil from '../components/SpinnerLil';
import SpinnerBig from '../components/SpinnerBig';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <SpinnerBig />
});

const NewIssues = () => {
  const { register, control, handleSubmit } = useForm();
  const router = useRouter();
  const [err, setErr] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [spinner, setSpinner] = useState(false);

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
      setSpinner(false);
      router.push('/issues');
    } catch (error) {
      setErr('Failed to create issue. Please try again.');
      setSpinner(false);
    }
  };

  return (
    <div>
      {err && <ErrorMessage isVisible={isVisible}>{err}</ErrorMessage>}
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
        <Button type="submit" onClick={() => setSpinner(true)}>submit {spinner && <SpinnerLil />}</Button>
        {/* also you can add disabled attribute for client that dont click anu more.... but i prefer to dont use it */}
      </form>
    </div>
  );
};

export default NewIssues
