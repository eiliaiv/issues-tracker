'use client'
import { useState } from 'react';
import React from 'react'
import dynamic from 'next/dynamic';
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const NewIssues = () => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const fnCreateIssues = async () =>{
    const res = await fetch("/api/createIssues",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        title: value,
      })
    })
    
  }
  console.log(value);
  return (
    <div className="max-w-xl space-y-5">
      <TextField.Root placeholder="Issues Title" onChange={(e) => setValue(e.target.value)} value={value}>
      </TextField.Root>
      <SimpleMDE placeholder="Issues Description" />
      <Button>submit</Button>
    </div>
  )
}

export default NewIssues
