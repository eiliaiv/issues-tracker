'use client'

import React from 'react'
import { Button, Table } from "@radix-ui/themes";
import Link from 'next/link';
import axios from 'axios';
import Notification from './components/Notification';
import { useState, useEffect } from 'react';
import { useNotif } from './hook/useNotif';
import SpinnerBig from './components/SpinnerBig';
import IssuesStatus from './components/IssuesStatus';


const IssuesPage = () => {
  const [err, setErr] = useState('');
  const [spinner, setSpinner] = useState(true);
  const [issues, setIssues] = useState([]);
  const isVisible = useNotif(err, setErr, 2500);

  const fnGetIssues = async () => {
    try {
      const res = await axios.get("/api/readIssues");
      setIssues(res.data || []);
      setSpinner(false);

    } catch (err) {
      setErr('Failed to get issues from server. check your connection');
      setSpinner(false);
    }
  }
  useEffect(() => {
    fnGetIssues();
  }, [])

  return (
    <div className='space-y-5'>
      {err && (
        <Notification color="red" isVisible={isVisible}>
          {err}
        </Notification>
      )}
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>issues</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <Link href={`/issues/${item.id}`}>{item.title}</Link>
              </Table.Cell>
              <Table.Cell><IssuesStatus status={item.status} /></Table.Cell>
              <Table.Cell className="hidden md:table-cell">{item.createdAt}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      {spinner && <div className='flex justify-center items-center' ><SpinnerBig /></div>}
      <Button>
        <Link href="/issues/newIssues">
          Create New Issue
        </Link>
      </Button>
    </div>

  )
}

export default IssuesPage
