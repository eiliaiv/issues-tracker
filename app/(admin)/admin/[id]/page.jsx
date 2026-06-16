

import React from 'react';
import {prisma} from '../../../lib/client';
import { notFound } from 'next/navigation';
import { Card, Flex, Heading, Grid, Box, Button } from '@radix-ui/themes';
import IssuesStatus from '../../../(client)/components/IssuesStatus';
import Markdown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import DeleteButton from '../../../(client)/components/DeleteButton';
import IssueButton from '../../components/IssueButton';


const adminDetailIss = async ({ params }) => {
  const { id } = await params;
  const issueId = await Number(id);

  const issues = await prisma.issues.findUnique({
    where: {
      id: issueId
    }
  });

  if (!issues)
    notFound();



  return (
    <div className='flex flex-col gap-7'>
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
      <div className='flex flex-row'>
        <IssueButton id={issues.id} status={issues.status} />
        <DeleteButton  id={issues.id} title={issues.title}/>
      </div>
    </div>
  );
};

export default adminDetailIss;