'use client'

import React from 'react'
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssues = () => {
  return (
    <div className="max-w-xl space-y-5">
      <TextField.Root placeholder="Issue Title">
      </TextField.Root>
      <SimpleMDE placeholder="Issue Description" />
      <Button>submit</Button>
    </div>
  )
}

export default NewIssues
