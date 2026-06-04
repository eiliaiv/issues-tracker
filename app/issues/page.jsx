import React from 'react'
import {Button} from "@radix-ui/themes";
import Link from 'next/link';
const IssuesPage = () => {
  return (
    <div className="space-y-5">
      <div>issues page</div>
      <Button>
        <Link href="/issues/newIssues">
          Create New Issue
        </Link>
      </Button>
    </div>
  )
}

export default IssuesPage
