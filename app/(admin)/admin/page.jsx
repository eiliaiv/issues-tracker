'use client'

import React from 'react'
import { Button, Table } from "@radix-ui/themes";
import Link from 'next/link';
import axios from 'axios';
import Notification from '../../(client)/components/Notification';
import { useState, useEffect } from 'react';
import { useNotif } from '../../(client)/hook/useNotif';
import SpinnerBig from '../../(client)/components/SpinnerBig';
import IssuesStatus from '../../(client)/components/IssuesStatus';
import { ReloadIcon } from '@radix-ui/react-icons';

const adminTable = () => {
  const [err, setErr] = useState('');
  const [spinner, setSpinner] = useState(true);
  const [issues, setIssues] = useState([]);
  const isVisible = useNotif(err, setErr, 1700);
  const [reload, setReload] = useState(false);



  const fnGetIssues = async () => {

    try {
      const res = await axios.get("/api/readIssues");
      setIssues(res.data || []);
      setSpinner(false);
      setReload(false);

    } catch (err) {
      setErr('Failed to get issues from server. check your connection');
      setSpinner(false);
      setReload(true);
    }
  }

console.log(issues)
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
            <Table.ColumnHeaderCell className="hidden md:table-cell">email</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <Link href={`/admin/${item.id}`}>{item.title}</Link>
              </Table.Cell>
              <Table.Cell><IssuesStatus status={item.status} /></Table.Cell>
              <Table.Cell className="hidden md:table-cell">{item.createdAt}</Table.Cell>
              <Table.Cell className="hidden md:table-cell">{item.user?.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      {spinner && <div className='flex justify-center items-center' ><SpinnerBig /></div>}
      {reload && <span className="ml-5">
        <Button onClick={() => {
          fnGetIssues();
          setSpinner(true);
        }}>
          <ReloadIcon />
          Reload</Button>
      </span>}
    </div>

  )
}


export default adminTable
