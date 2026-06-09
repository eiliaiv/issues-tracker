import React from 'react'
import { notFound } from 'next/navigation'
import prisma from '../../../lib/client'
import EditForm from './EditForm'

const Page = async ({ params }) => {
  const { id } = await params
  const issueId = Number(id)



  const issue = await prisma.issues.findUnique({ where: { id: issueId } })

  if (!issue) notFound()

  return (
    <div className="py-6">
      <EditForm issue={issue} />
    </div>
  )
}

export default Page
