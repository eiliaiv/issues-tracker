import React from 'react'
import { Badge } from "@radix-ui/themes"



const statusMap = {
  OPEN: {
    label: "OPEN",
    color: "green"
  },
  IN_PROGRESS: {
    label: "IN_PROGRESS",
    color: "orange"
  },
  CLOSED: {
    label: "CLOSED",
    color: "red"
  }
};




const IssuesStatus = ({ status }) => {
  return (
    <Badge color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  )
}

export default IssuesStatus
