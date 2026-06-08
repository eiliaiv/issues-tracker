import React from 'react';
import prisma from '../../lib/client';
import { notFound } from 'next/navigation';
import { Card, Flex, Heading } from '@radix-ui/themes';
import IssuesStatus from '../components/IssuesStatus';
import Markdown from 'react-markdown';

const IssuesDetailPage = async ({ params }) => {
  const { id } = await params;
  const issueId = Number(id);

  if (!Number.isInteger(issueId)) {
    notFound();
  }

  const issues = await prisma.issues.findUnique({
    where: {
      id: issueId
    }
  });

  if (!issues)
    notFound();


  return (
    <div className='space-y-5'>
      <div className='flex flex-col md:flex-row md:justify-between'>
        <Heading>{issues.title}</Heading>
        <div className='flex gap-3'>
          <IssuesStatus status={issues.status} />
          <p>{issues.createdAt.toDateString()}</p>
        </div>
      </div>
      <Card><Markdown>{issues.description}</Markdown></Card>
    </div>
  );
};

export default IssuesDetailPage;