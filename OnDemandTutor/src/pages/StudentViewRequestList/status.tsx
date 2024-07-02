import React, { InputHTMLAttributes } from 'react'
import { Request } from '../../types/request.type'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  request: Request
  className?: string
}

export default function status({
  request,
  className = 'bg-yellow-500 shadow-md w-1/6 flex items-center justify-center text-center font-bold rounded-lg ml-2'
}: Props) {
  return <div className={className}>{request.status}</div>
}
