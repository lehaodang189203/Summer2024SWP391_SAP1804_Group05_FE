import React, { InputHTMLAttributes } from 'react'
import { ServiceTutor } from '../../types/request.type'
import { statusReq } from '../../constant/status.Req'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  service: any
  className?: string
}

export default function Status({
  service,
  className = 'shadow-md w-1/6 flex items-center justify-center text-center font-bold rounded-lg ml-2'
}: Props) {
  // Determine the background color based on the Service status
  const statusService =
  service.status === statusReq.approved ? 'bg-green-500' : 'bg-yellow-500'

  return <div className={`${className} ${statusService}`}>{service.status}</div>
}
