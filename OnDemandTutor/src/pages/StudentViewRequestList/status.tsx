import React, { InputHTMLAttributes } from 'react'
import { Request } from '../../types/request.type'
import { statusReq } from '../../constant/status.Req'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  request: Request
  className?: string
}

export default function Status({
  request,
  className = 'shadow-md w-1/6 flex items-center justify-center text-center font-bold rounded-lg ml-2'
}: Props) {
  // Determine the background color based on the request status
  const statusClass =
    request.status === statusReq.approved ? 'bg-green-500' : 'bg-yellow-500'

  return <div className={`${className} ${statusClass}`}>{request.status}</div>
}
