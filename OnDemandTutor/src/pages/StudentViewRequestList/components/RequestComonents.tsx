import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook,
  faCalendarDays,
  faClock,
  faGraduationCap,
  faSchool
} from '@fortawesome/free-solid-svg-icons'
import Status from '../status'
import { Request as RequestType } from '../../../types/request.type'
import { statusReq } from '../../../constant/status.Req'
import { path } from '../../../constant/path'
import FormRequest from '../../FormRequest/FormRequest'
import { useNavigate } from 'react-router-dom'
import { studentApi } from '../../../api/student.api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface Props {
  request: RequestType
  refetch?: (() => void) | undefined
}

export default function RequestComponents({ request, refetch }: Props) {
  const [showButtons, setShowButtons] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  const handleMouseEnter = () => {
    setShowButtons(true)
  }

  const handleMouseLeave = () => {
    setShowButtons(false)
  }

  const handleOpenPopup = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  const handleChangePath = (idRe: string) => {
    if (request.status === statusReq.approved) {
      navigate(`${path.tutors}/${idRe}`)
    }
  }

  const handleDeleteRequest = useMutation({
    mutationFn: (idRequest: string) => studentApi.deleteRequest(idRequest),
    onSuccess: (data) => {
      if (refetch) {
        toast.success(data.data.message)
        refetch() // refetch lại API khi xóa thành công
      }
    }
  })

  const handleDelete = (idRequest: string) => {
    console.log(idRequest)

    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa không?')
    if (isConfirmed) {
      handleDeleteRequest.mutate(idRequest)
    }
  }

  return (
    <>
      <div
        className='container m-5 p-3 flex border shadow-md rounded-md relative hover:bg-gray-200'
        key={request.idRequest}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleChangePath(request.idRequest)}
      >
        <div className='w-10/12 bg-slate-100 rounded-xl text-left justify-between text-base p-5 border shadow-md'>
          <h1 className='font-bold text-xl text-black text-center'>
            {request.title}
          </h1>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faCalendarDays} className='mr-2' />
                <span>{request.timeTable}</span>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faSchool} className='mr-2' />
                <span>{request.learningMethod}</span>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faGraduationCap} className='mr-2' />
                <span>{request.class}</span>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faBook} className='mr-2' />
                <span>{request.subject}</span>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faClock} className='mr-2' />
                <span>
                  {request.timeStart} tới {request.timeEnd}
                </span>
              </div>
              <div className='flex items-center'>
                <span>Mong muốn: {request.description}</span>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='font-bold text-lg'>Giá mong muốn</div>
              <div>{request.price}</div>
            </div>
          </div>
        </div>
        <Status request={request} />
        {request.status === statusReq.pending && showButtons && (
          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md z-10'>
            <div className='flex items-center gap-2 p-3 rounded-md'>
              <button
                onClick={handleOpenPopup}
                className='bg-yellow-300 text-white px-4 py-2 rounded-md'
              >
                Cập nhật
              </button>
              <button
                onClick={() => handleDelete(request.idRequest)}
                className='bg-red-500 text-white px-4 py-2 rounded-md'
              >
                Xóa
              </button>
            </div>
          </div>
        )}
        {showForm && (
          <FormRequest
            idRequest={request.idRequest}
            onClose={handleCloseForm}
            refetch={refetch}
          />
        )}
      </div>
    </>
  )
}
