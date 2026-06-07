import React from 'react';
import prisma from '../../lib/client';
import { notFound } from 'next/navigation';

const IssuesDetailPage = async ({ params }) => {
  const { id } = await params;
    if(typeof id !== "number")
      notFound();
  const issue = await prisma.issues.findUnique({
    where: {
      id: parseInt(id)
    }
  });

  if (!issue)
    notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.status}</p>
      <p>{issue.description}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssuesDetailPage;