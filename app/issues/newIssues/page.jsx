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
import Notification from '../components/Notification';
import SpinnerLil from '../components/SpinnerLil';
import SpinnerBig from '../components/SpinnerBig';
import {useNotif} from '../hook/useNotif';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <div className='flex justify-center items-center' ><SpinnerBig /></div>
});

const NewIssues = () => {
  const { register, control, handleSubmit } = useForm();
  const router = useRouter();
  const [err, setErr] = useState('');
  const [spinner, setSpinner] = useState(false);
  const isNotifVisible = useNotif(err,setErr, 2500);


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
      {err && <Notification color="red" isVisible={isNotifVisible}>
        {err}
      </Notification>}
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
